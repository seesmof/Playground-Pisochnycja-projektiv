"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [direction, setDirection] = useState<"Up" | "Right" | "Down" | "Left">(
    "Up",
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setDirection("Up");
    } else if (event.key === "ArrowRight") {
      setDirection("Right");
    } else if (event.key === "ArrowDown") {
      setDirection("Down");
    } else if (event.key === "ArrowLeft") {
      setDirection("Left");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
