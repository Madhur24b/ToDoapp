import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date?: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  createdAt: number;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage with error handling
  useEffect(() => {
    try {
      const stored = localStorage.getItem('todos');
      if (stored) {
        const parsedTodos = JSON.parse(stored);
        // Validate the data structure
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.error('Invalid todo data structure in localStorage');
          setTodos([]);
        }
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      setTodos([]);
    }
  }, []);

  // Save todos to localStorage on every update with error handling
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (todo: Todo) => setTodos((prev: Todo[]) => [...prev, todo]);

  const updateTodo = (updated: Todo) =>
    setTodos((prev: Todo[]) => prev.map((t: Todo) => (t.id === updated.id ? { ...t, ...updated } : t)));

  const deleteTodo = (id: string) =>
    setTodos((prev: Todo[]) => prev.filter((t: Todo) => t.id !== id));

  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo, 
      updateTodo, 
      deleteTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within a TodoProvider');
  return context;
};

