import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-orange-600 text-white shadow-md dark:bg-gray-900">
      <h1 className="text-xl font-bold tracking-wide">📝 TODO App</h1>
      <div className="flex gap-4 items-center">
        <Link href="/add" className="hover:underline">Add</Link>
        <Link href="/view" className="hover:underline">View</Link>
        <Link href="/edit" className="hover:underline">Edit</Link>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="ml-4 bg-white text-black px-2 py-1 rounded"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        )}
      </div>
    </nav>
  );
}


