import Link from 'next/link';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-fuchsia-800 to-indigo-900 dark:bg-black text-white p-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full border border-white/20">
          <h1 className="text-4xl font-extrabold mb-8">Welcome to the  TODO App!</h1>
          <h3 className="text-1xl font-extrabold mb-3">Finish your tasks before time</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/add" className="bg-pink-600 hover:bg-pink-400 text-white font-semibold py-3 px-6 rounded-xl shadow-md">
              ➕ Add TODO
            </Link>
            <Link href="/view" className="bg-cyan-600 hover:bg-cyan-400 text-white font-semibold py-3 px-6 rounded-xl shadow-md">
              📋 View TODOs
            </Link>
            <Link href="/edit" className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-xl shadow-md">
              ✏️ Edit TODOs
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}


