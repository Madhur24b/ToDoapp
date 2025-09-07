import { useTodos } from '../context/TodoContext';

export default function StorageInfo() {
  const { todos, getStorageUsage, clearTodos } = useTodos();

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="mt-4 p-4 bg-white/10 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Storage Information</h3>
      <div className="space-y-2">
        <p>Total Tasks: {todos.length}</p>
        <p>Storage Used: {formatSize(getStorageUsage())}</p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all todos? This cannot be undone.')) {
              clearTodos();
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear All Tasks
        </button>
      </div>
    </div>
  );
}
