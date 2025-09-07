import { NextPage } from 'next';
import NavBar from '../components/NavBar';
import { useTodos } from '../context/TodoContext';
import { Todo } from '../context/TodoContext';

const View: NextPage = () => {
  const { todos } = useTodos();

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      default:
        return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 mb-6">TaskMaster</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/20 rounded-lg shadow-lg p-6 border border-white/40 hover:shadow-xl transition-all hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {todo.title}
              </h2>
              <p className="text-gray-700 mb-3">{todo.description}</p>
              <div className="flex items-center justify-between">
                <span className={`font-medium ${getPriorityColor(todo.priority)}`}>
                  Priority: {todo.priority}
                </span>
                <span className="text-lg" title={`Status: ${todo.completed ? 'Completed' : 'Pending'}`}>
                  {getStatusIcon(todo.completed ? 'completed' : 'pending')}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {todo.date && `Due: ${new Date(todo.date).toLocaleDateString()}`}
              </div>
            </div>
          ))}
        </div>
        {todos.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default View;
