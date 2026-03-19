"use client";

import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState<number>(0);

  return (
    <div className="bg-linear-to-br to-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md outline outline-sky-300 p-3 flex flex-row gap-3">
        <button
          className="bg-sky-50 p-3 rounded-md"
          onClick={() => setNumber((prevNumber) => prevNumber - 1)}
        >
          -
        </button>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(Number.parseInt(e.target.value))}
          className="p-3 text-center outline outline-sky-50 rounded-md"
        />
        <button
          className="bg-sky-50 p-3 rounded-md"
          onClick={() => setNumber((prevNumber) => prevNumber + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
