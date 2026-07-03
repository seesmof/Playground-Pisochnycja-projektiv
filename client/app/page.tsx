"use client";

import { useState } from "react";

export default function Page() {
  const [nextStep, setNextStep] = useState<"X" | "Y">("X");
  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  return (
    <div className="p-3 gap-3">
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
      <p className="my-4">This is a simple tic tac toe game app.</p>
      <div className="grid grid-cols-3 grid-rows-3 gap-3">
        <button
          className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"
          onClick={() => {
            setGrid([[nextStep, ...grid], [...grid], [...grid]]);
          }}
        ></button>
        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>
        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>

        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>
        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>
        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>

        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>
        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>
        <button className="outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md"></button>
      </div>
    </div>
  );
}
