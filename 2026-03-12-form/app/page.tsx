"use client";

import { useState } from "react";

const names: string[] = [
  "Barnabas",
  "Paul",
  "Jesus",
  "Mary",
  "John",
  "Mark",
  "Peter",
];

const pick = (array: string[]): number => {
  return Math.floor(Math.random() * array.length);
};

export default function Home() {
  const [name, setName] = useState<string>("");

  return (
    <div className="bg-linear-to-br to-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow p-3 flex flex-col gap-3">
        <button className="btn" onClick={() => setName(names[pick(names)])}>
          Generate
        </button>
        <input
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name here..."
        />
        <input
          type="text"
          className="input bg-stone-50"
          value={name}
          readOnly
        />
        <button className="btn" onClick={() => setName("")}>
          Clear
        </button>
      </div>
    </div>
  );
}
