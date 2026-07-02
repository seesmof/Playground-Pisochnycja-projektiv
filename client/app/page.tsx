"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="p-3 flex flex-col gap-3">
      <input
        type="text"
        className="input w-full"
        placeholder="Enter your request..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn">Parse</button>
      <textarea
        disabled
        className="textarea w-full resize-none"
        rows={3}
        name="output"
        id="outputTextarea"
        value={input}
      />
    </div>
  );
}
