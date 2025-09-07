import { useTodos } from '../context/TodoContext';
import NavBar from '../components/NavBar';
import { useState, useMemo } from 'react';

export default function ViewPage() {
  const { todos } = useTodos();
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'category' | 'created'>('created');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const categories = useMemo(() => {
    const cats = new Set(todos.map(todo => todo.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [todos]);

  const sortedAndFilteredTodos = useMemo(() => {
    let filtered = todos;
    
    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(todo => todo.category === filterCategory);
    }

    // Filter by completion status
    if (!showCompleted) {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // Sort todos
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return (a.date || '').localeCompare(b.date || '');
        case 'priority': {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [todos, sortBy, filterCategory, showCompleted]);

  return (
    <>
      <NavBar />
      <main className="min-h-screen p-8 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
            Your Tasks
          </h1>

          <div className="glass-card p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                className="p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="created">Sort by Created Date</option>
                <option value="date">Sort by Deadline</option>
                <option value="priority">Sort by Priority</option>
                <option value="category">Sort by Category</option>
              </select>

              <select
                className="p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              <button
                className="p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? '🔍 Hide Completed' : '🔍 Show Completed'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredTodos.length === 0 && (
              <div className="col-span-full">
                <p className="text-center text-gray-300 glass-card p-8">
                  No tasks found. Try adding one or adjusting your filters!
                </p>
              </div>
            )}
            
            {sortedAndFilteredTodos.map((todo) => {
              const deadline = todo.date ? new Date(todo.date) : null;
              const daysUntilDeadline = deadline
                ? Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : null;
              
              const deadlineClass = daysUntilDeadline
                ? daysUntilDeadline <= 1
                  ? 'deadline-close'
                  : daysUntilDeadline <= 3
                    ? 'deadline-approaching'
                    : 'deadline-safe'
                : '';

              return (
                <div
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'opacity-75' : ''} priority-${todo.priority}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold">{todo.title}</h2>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full bg-white/10 ${
                      todo.completed ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {todo.completed ? '✅ Done' : '⏳ Pending'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4">
                    {todo.description || 'No description'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {todo.category && (
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                        � {todo.category}
                      </span>
                    )}
                    {todo.date && (
                      <span className={`text-xs px-2 py-1 rounded-full bg-white/10 ${deadlineClass}`}>
                        📅 {todo.date}
                        {daysUntilDeadline !== null && (
                          <span className="ml-1">
                            ({daysUntilDeadline} day{Math.abs(daysUntilDeadline) !== 1 ? 's' : ''} {daysUntilDeadline < 0 ? 'overdue' : 'left'})
                          </span>
                        )}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full bg-white/10`}>
                      🎯 {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
  );
}






