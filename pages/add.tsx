import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/router';

export default function AddPage() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({ title, description, date });
      router.push('/view');
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 dark:bg-black text-white p-6 text-center">
        <form
          onSubmit={handleSubmit}
         className="bg-orange-600 dark:bg-orange-600 p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">

      
          <h1 className="text-3xl font-bold">Add a New Task</h1>
          <input
            type="text"
            className="w-full p-3 rounded bg-white/80 text-black"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-3 rounded bg-white/80 text-black"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          ></textarea>
          <input
            type="date"
            className="w-full p-3 rounded bg-white/80 text-black"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="w-full bg-orange-300 hover:bg-pink-500 text-white font-semibold py-3 rounded-xl">
            ➕ Add Task
          </button>
        </form>
      </main>
    </>
  );
}


