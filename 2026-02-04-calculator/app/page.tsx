"use client";

import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("0");

  return (
    <div className="bg-sky-50 flex items-center justify-center h-screen">
      <div className="bg-white rounded-md p-3 gap-2 flex flex-col">
        <input
          type="text"
          className="input text-end"
          readOnly
          onClick={() => navigator.clipboard.writeText(value)}
          value={value}
        />
        <div className="grid gap-2 grid-cols-4 grid-rows-4">
          <button className="btn col-span-1">7</button>
          <button className="btn col-span-1">8</button>
          <button className="btn col-span-1">9</button>
          <button className="btn col-span-1">/</button>
          <button className="btn col-span-1">4</button>
          <button className="btn col-span-1">5</button>
          <button className="btn col-span-1">6</button>
          <button className="btn col-span-1">*</button>
          <button className="btn col-span-1">1</button>
          <button className="btn col-span-1">2</button>
          <button className="btn col-span-1">3</button>
          <button className="btn col-span-1">-</button>
          <button className="btn col-span-1">0</button>
          <button className="btn col-span-1">,</button>
          <button className="btn col-span-1">=</button>
          <button className="btn col-span-1">+</button>
        </div>
      </div>
    </div>
  );
}
