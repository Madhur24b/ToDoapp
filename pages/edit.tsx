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

  useEffect(() => {
    const todo = todos.find((t) => t.id === selectedId);
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setDate(todo.date || '');
      setCompleted(todo.completed);
    }
  }, [selectedId]);

  const handleUpdate = () => {
    if (!selectedId) return;
    updateTodo({
      id: selectedId,
      title,
      description,
      date,
      completed,
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
      <main className="min-h-screen bg-gradient-to-r from-fuchsia-800 to-indigo-900 dark:bg-black text-white p-10">
        <div className="max-w-2xl mx-auto bg-orange-600 dark:bg-orange-800 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-white-600">Edit TODO</h1>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-orange-700">Select a task</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full p-3 rounded bg-white text-black text-lg"
            >
              <option value="">-- Select a TODO --</option>
              {todos.map((todo) => (
                <option key={todo.id} value={todo.id}>
                  {todo.title}
                </option>
              ))}
            </select>
          </div>

          {selectedId && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-orange-700">Title</label>
                  <input
                    className="w-full p-3 rounded bg-white text-black text-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-orange-700">Description</label>
                  <textarea
                    className="w-full p-3 rounded bg-white text-black text-lg"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-orange-700">Date</label>
                  <input
                    type="date"
                    className="w-full p-3 rounded bg-white text-black text-lg"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-orange-700">Status</label>
                  <select
                    value={completed ? 'completed' : 'pending'}
                    onChange={(e) => setCompleted(e.target.value === 'completed')}
                    className="w-full p-3 rounded bg-white text-black text-lg"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleUpdate}
                    className="w-full bg-yellow-400 text-black py-3 rounded-xl"
                  >
                    ✏️ Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full bg-red-600 text-white py-3 rounded-xl"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
