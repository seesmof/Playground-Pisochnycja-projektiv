"use client";

import { useState } from "react";

interface Todo {
  text: string;
  status: "Pending" | "Done";
}

export default function Home() {
  const [text, setText] = useState("");

  return (
    <div className="p-3 w-full flex gap-3">
      <input
        className="input flex-1"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="btn">Submit</button>
    </div>
  );
}
