"use client";

import { FormEvent, useEffect, useState } from "react";

const factorial = (num: number): number => {
  if (num < 0) return 0;
  let result: number = 1;
  for (let index = 1; index <= num; index++) {
    result = result * index;
  }
  return result;
};

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number>(0);

  const calculateAndSetResults = () => {
    const num = Number.parseInt(input);
    if (!isNaN(num)) setResult(factorial(num));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    calculateAndSetResults();
  };

  const cleanseInputs = () => {
    setInput("");
    setResult(0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === "\n") calculateAndSetResults();
    if (event.key === "Delete") cleanseInputs();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="bg-sky-50 min-h-screen p-3 flex items-center justify-center">
      <div className="bg-white rounded-md p-3 w-full max-w-xl">
        <form className="flex flex-row gap-2 w-full" onSubmit={handleSubmit}>
          <button type="reset" className="btn" onClick={cleanseInputs}>
            Clear
          </button>
          <input
            type="number"
            placeholder="A number to calculate factorial of..."
            className="input flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <input
          type="text"
          className="input mt-2 flex-1 w-full"
          readOnly
          value={result}
          onClick={() => navigator.clipboard.writeText(result.toString())}
        />
      </div>
    </div>
  );
}
