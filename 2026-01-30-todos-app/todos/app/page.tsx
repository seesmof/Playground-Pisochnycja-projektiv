"use client";

import React, { useState } from "react";

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

  const toggleCheck = (item: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.text === item.text
          ? { ...todo, status: todo.status === "Pending" ? "Done" : "Pending" }
          : todo,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") alert("Please fill in the input field.");

    addNewTodo();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-3 w-full flex gap-3">
        <input
          className="input flex-1"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <div className="p-3 flex flex-col list-disc list-inside">
        {todos.map((item) => (
          <div key={item.text} className="flex flex-row gap-2">
            <input
              type="checkbox"
              checked={item.status === "Done"}
              onChange={() => toggleCheck(item)}
              id={`todo-${item.text}`}
            />
            <label htmlFor={`todo-${item.text}`}>{item.text}</label>
          </div>
        ))}
      </div>
    </>
  );
}
