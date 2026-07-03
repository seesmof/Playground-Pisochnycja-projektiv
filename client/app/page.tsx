"use client";

import { useState } from "react";

const buttonClasses =
  "outline-2 active:scale-95 text-3xl aspect-square cursor-pointer rounded-md";

export default function Page() {
  const [nextStep, setNextStep] = useState<"X" | "O">("X");
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
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[0][0] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[0][0]}
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[0][1] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[0][1]}
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[0][2] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[0][2]}
        </button>

        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[1][0] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[1][0]}
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[1][1] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[1][1]}
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[1][2] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[1][2]}
        </button>

        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[2][0] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[2][0]}
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[2][1] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[2][1]}
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const newGrid = grid;
            newGrid[2][2] = nextStep;
            setGrid(newGrid);
            setNextStep(nextStep === "X" ? "O" : "X");
          }}
        >
          {grid[2][2]}
        </button>
      </div>
    </div>
  );
}
