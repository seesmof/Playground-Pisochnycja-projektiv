"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-sky-50 min-h-screen p-3 flex items-center justify-center">
      <div className="bg-white rounded-md p-3">
        <button
          className="btn"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
}
