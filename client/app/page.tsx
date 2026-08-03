"use client";

import { useState } from "react";

export interface Item {
  name: string;
  price: number;
}

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);

  const addNewItem = () => {
    const newItem: Item = { name: "iPhone 15 Max", price: 1000 };
    setItems([...items, newItem]);
  };

  return (
    <div className="p-3">
      <div className="flex gap-3">
        <button
          className="bg-sky-600 cursor-pointer active:scale-95 hover:bg-sky-700 text-white p-3 rounded-md"
          onClick={addNewItem}
        >
          Add
        </button>
        <button
          className="bg-red-600 cursor-pointer active:scale-95 hover:bg-red-700 text-white p-3 rounded-md"
          onClick={() => setItems([])}
        >
          Clear
        </button>
      </div>
      <ul className="list-inside pl-1 list-disc mt-3">
        {items.map((item, index) => (
          <li key={index}>
            {item.name} costs ${item.price}.
          </li>
        ))}
      </ul>
    </div>
  );
}
