import Link from 'next/link';
import NavBar from '../components/NavBar';
import { useTheme } from 'next-themes';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        {/* Main content */}
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="glass-card backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl shadow-2xl p-10 max-w-2xl w-full mx-4 transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
                  TaskMaster
                </h1>
                <p className="text-lg text-gray-300 max-w-xl mx-auto">
                  Organize your tasks, boost productivity, and achieve more with our intuitive task management system.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link 
                  href="/add" 
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  ➕ Create Task
                </Link>
                <Link 
                  href="/view" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  📋 View Tasks
                </Link>
                <Link 
                  href="/edit" 
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  ✏️ Edit Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


