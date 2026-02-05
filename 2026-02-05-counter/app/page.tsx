"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-sky-100 h-screen flex items-center justify-center">
      <div className="bg-white p-3 rounded-md shadow flex flex-row items-center gap-3">
        <button className="btn" onClick={() => setCount(count - 1)}>
          Less
        </button>
        <p>{count}</p>
        <button className="btn" onClick={() => setCount(count + 1)}>
          More
        </button>
      </div>
    </div>
  );
}
