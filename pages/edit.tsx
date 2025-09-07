import { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import NavBar from '../components/NavBar';

export default function EditPage() {
  const { todos, updateTodo, deleteTodo } = useTodos();
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const todo = todos.find((t) => t.id === selectedId);
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setDate(todo.date || '');
      setCompleted(todo.completed);
      setPriority(todo.priority || 'medium');
      setCategory(todo.category || '');
    }
  }, [selectedId]);

  const handleUpdate = () => {
    if (!selectedId) return;
    const todo = todos.find(t => t.id === selectedId);
    if (!todo) return;
    
    updateTodo({
      ...todo,
      title,
      description,
      date,
      completed,
      priority,
      category
    });
    alert('✅ Task updated successfully!');
  };

  const handleDelete = () => {
    if (!selectedId) return;
    if (confirm('Delete this task?')) {
      deleteTodo(selectedId);
      setSelectedId('');
      setTitle('');
      setDescription('');
      setDate('');
      setCompleted(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white p-10">
        <div className="max-w-2xl mx-auto glass-card p-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
            Edit Task
          </h1>

          <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-200">Select a task</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
            >
              <option value="">-- Select a Task --</option>
              {todos.map((todo) => (
                <option key={todo.id} value={todo.id}>
                  {todo.title}
                </option>
              ))}
            </select>
          </div>

          {selectedId && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Title</label>
                <input
                  className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Description</label>
                <textarea
                  className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Deadline</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Priority</label>
                  <select
                    className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Category</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                    placeholder="e.g., Work, Personal, Shopping"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Status</label>
                  <select
                    value={completed ? 'completed' : 'pending'}
                    onChange={(e) => setCompleted(e.target.value === 'completed')}
                    className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={handleUpdate}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
