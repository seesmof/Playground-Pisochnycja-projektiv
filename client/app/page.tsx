"use client";

import { useState } from "react";

export default function Page() {
  const [direction, setDirection] = useState<"Up" | "Right" | "Down" | "Left">(
    "Up",
  );

  return (
    <div className="p-3">
      {direction === "Up" ? (
        <p>/\</p>
      ) : direction === "Right" ? (
        <p>&lt;</p>
      ) : direction === "Down" ? (
        <p>\/</p>
      ) : direction === "Left" ? (
        <p>&gt;</p>
      ) : (
        "Invalid direction."
      )}
    </div>
  );
}
