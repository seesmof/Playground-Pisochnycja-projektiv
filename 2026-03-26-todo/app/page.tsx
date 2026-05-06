"use client";

import { useState } from "react";

interface Todo {
  isDone: boolean;
  message: string;
}
const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { isDone: false, message: "Learn Rust" },
    { isDone: false, message: "Finish this task" },
    { isDone: true, message: "Read React docs" },
  ]);

  const handleToggle = (todoMessage: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.message === todoMessage ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-linear-to-br to-sky-50 min-h-screen p-3 flex items-center justify-center">
      <div className="bg-white rounded-md shadow p-3">
        {todos.map((todo) => (
          <div key={todo.message} className="flex flex-row gap-3">
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggle(todo.message)}
              id={todo.message}
            />
            <label htmlFor={todo.message}>{todo.message}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
