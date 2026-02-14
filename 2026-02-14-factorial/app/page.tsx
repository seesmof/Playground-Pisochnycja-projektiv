"use client";

import { FormEvent, useState } from "react";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num = Number.parseInt(input);
    if (!isNaN(num)) setResult(factorial(num));
  };

  return (
    <div className="bg-sky-50 min-h-screen p-3 flex items-center justify-center">
      <div className="bg-white rounded-md p-3 w-full max-w-xl">
        <form className="flex flex-row gap-2 w-full" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="A factorial number"
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
        />
      </div>
    </div>
  );
}
