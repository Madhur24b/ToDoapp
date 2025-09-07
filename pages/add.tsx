import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function AddPage() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        id: Date.now().toString(),
        title,
        description,
        date,
        priority,
        category,
        completed: false,
        createdAt: Date.now()
      });
      router.push('/view');
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white p-6">
        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 w-full max-w-lg space-y-6"
        >
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
            Add a New Task
          </h1>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Title</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Description</label>
            <textarea
              className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Deadline</label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Priority</label>
              <select
                className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Category</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Work, Personal, Shopping"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            ➕ Add Task
          </button>
        </form>
      </main>
    </>
  );
}
