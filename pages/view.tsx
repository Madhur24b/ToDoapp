import { useTodos } from '../context/TodoContext';
import NavBar from '../components/NavBar';

export default function ViewPage() {
  const { todos } = useTodos();

  return (
    <>
      <NavBar />
      <main className="min-h-screen p-8 bg-gradient-to-r from-fuchsia-800 to-indigo-900 dark:bg-black text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Your TODOs</h1>
        <div className="space-y-4 max-w-3xl mx-auto">
          {todos.length === 0 && (
            <p className="text-center text-gray-300">No tasks yet. Try adding one!</p>
          )}
          {todos.map((todo) => (
           <div
  key={todo.id + String(todo.completed)}
  className="relative p-4 rounded-xl shadow-md bg-orange-600 dark:bg-orange-600 text-black dark:text-white"
>

              <h2 className="text-2xl font-semibold mb-1 text-black-600">{todo.title}</h2>
              <p className="text-sm mb-2 text-black-600">{todo.description || 'No description'}</p>
              {todo.date && (
                <p className="text-xs mb-1 text-black-400">📅 {todo.date}</p>
              )}
              <span className="absolute bottom-3 right-4 text-sm font-semibold text-black-500">
                {todo.completed ? '✅ Completed' : '⏳ Pending'}
              </span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}






