import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/10 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 bg-opacity-70 dark:bg-gray-900/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
              📝 TaskMaster
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <Link
                href="/add"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                ➕ Add Task
              </Link>
              <Link
                href="/view"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                📋 View Tasks
              </Link>
              <Link
                href="/edit"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                ✏️ Edit Tasks
              </Link>
            </div>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="inline-flex items-center justify-center p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/add"
            className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:bg-white/10"
          >
            ➕ Add Task
          </Link>
          <Link
            href="/view"
            className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:bg-white/10"
          >
            📋 View Tasks
          </Link>
          <Link
            href="/edit"
            className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:bg-white/10"
          >
            ✏️ Edit Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
}
