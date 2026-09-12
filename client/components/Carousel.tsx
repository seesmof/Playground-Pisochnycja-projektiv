"use client";

import { useState } from "react";

const colors: string[] = [
  "bg-red-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-blue-600",
  "bg-cyan-600",
  "bg-amber-600",
  "bg-pink-600",
];

export default function Carousel() {
  const [index, setIndex] = useState<number>(0);
  const [color, setColor] = useState<string>(colors[index]);

  return (
    <div className="flex flex-row gap-3 items-center">
      <button
        className="btn h-80"
        onClick={() => {
          const prevIndex = index > 0 ? index - 1 : colors.length - 1;
          setIndex(prevIndex);
          setColor(colors[prevIndex]);
        }}
      >
        Prev
      </button>
      <div className={`rounded-md ${color} p-3 h-80 flex-1`}></div>
      <button
        className="btn h-80"
        onClick={() => {
          const nextIndex = index < colors.length - 1 ? index + 1 : 0;
          setIndex(nextIndex);
          setColor(colors[nextIndex]);
        }}
      >
        Next
      </button>
    </div>
  );
}
