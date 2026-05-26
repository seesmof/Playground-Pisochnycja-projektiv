"use client";

import { useState } from "react";

export default function HomePage() {
  const [items, setItems] = useState<string[]>([
    "apple",
    "banana",
    "orange",
    "pear",
    "strawbery",
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
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
