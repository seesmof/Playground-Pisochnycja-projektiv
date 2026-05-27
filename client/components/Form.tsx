"use client";

import { useState } from "react";

export default function Form() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="bg-white rounded-md shadow p-3 flex flex-col gap-3">
      <input
        type="text"
        className="input w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <p>{input}</p>
    </div>
  );
}
