"use client";

import { useState } from "react";

interface Todo {
  text: string;
  status: "Pending" | "Done";
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Finish a task", status: "Pending" },
    { text: "Contact a professor", status: "Done" },
  ]);
  const [text, setText] = useState("");

  const addNewTodo = () => {
    if (text.trim() === "") return;

    const newTodo: Todo = { text: text, status: "Pending" };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setText("");
  };

  return (
    <>
      <div className="p-3 w-full flex gap-3">
        <input
          className="input flex-1"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className="btn" onClick={addNewTodo}>
          Submit
        </button>
      </div>
      <ul className="p-3 flex flex-col list-disc list-inside">
        {todos.map((item) => (
          <li key={item.text}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}
