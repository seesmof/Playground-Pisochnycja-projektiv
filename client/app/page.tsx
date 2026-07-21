"use client";

import { useState } from "react";

const categories: string[] = ["Flat", "House", "Duplex"];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="p-3 mx-auto max-w-md w-full">
      <div className="flex gap-1">
        <button
          className="px-2 rounded-md bg-stone-200 hover:bg-stone-300 duration-300 cursor-pointer"
          onClick={() => setSelectedCategory("")}
        >
          None
        </button>
        {categories.map((category, index) => (
          <button
            className="px-2 rounded-md bg-stone-200 hover:bg-stone-300 duration-300 cursor-pointer"
            key={index}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p>{selectedCategory}</p>
    </div>
  );
}
