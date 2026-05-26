"use client";

import { useState } from "react";

export default function HomePage() {
  const [items, setItems] = useState<string[]>([
    "apple",
    "banana",
    "orange",
    "pear",
    "strawberry",
    "raspberry",
  ]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const newItems = [...items, input];
    setItems(newItems);
    console.log(`Successfully added ${input}.`);
    setInput("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form className="flex flex-row gap-3 p-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 input"
          placeholder="Item description..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn">Add</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-3">
        {items.map((item, index) => (
          <div
            className="bg-white p-3 rounded-md outline outline-stone-300 justify-between flex flex-row"
            key={index}
          >
            <p>{item}</p>
            <button
              className="btn"
              onClick={() => {
                const newItems = items.filter((i) => i !== item);
                setItems(newItems);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
