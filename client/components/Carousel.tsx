"use client";

import { useState } from "react";

const colors: string[] = ["bg-red-500", "bg-cyan-500", "bg-amber-500"];

const Carousel = () => {
  const [index, setIndex] = useState<number>(0);
  const [color, setColor] = useState<string>(colors[index]);

  return (
    <div className="flex flex-row gap-3 items-center">
      <button
        className="btn"
        onClick={() => {
          const prevIndex = index > 0 ? index - 1 : colors.length - 1;
          setIndex(prevIndex);

          setColor(colors[index]);
        }}
      >
        Prev
      </button>
      <div className={`rounded-md ${color} p-3 h-80 flex-1`}></div>
      <button
        className="btn"
        onClick={() => {
          const nextIndex = index < colors.length ? index + 1 : 0;
          setIndex(nextIndex);

          setColor(colors[index]);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
