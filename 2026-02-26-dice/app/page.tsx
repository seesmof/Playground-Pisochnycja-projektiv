"use client";

import { useState } from "react";

const calculateRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};

export default function Home() {
  const [number, setNumber] = useState<number>(0);

  const handleClick = () => {
    setNumber(calculateRandom(1, 6));
  };

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white border border-sky-300 p-3 rounded-md gap-3 flex flex-col">
        <input
          type="text"
          className="input text-center"
          value={number}
          readOnly
        />
        <button className="btn w-full" onClick={handleClick}>
          Generate
        </button>
      </div>
    </div>
  );
}
