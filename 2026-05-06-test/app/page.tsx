"use client";

import { useState } from "react";

const Button = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <button className="btn" onClick={() => setCount((count) => count + 1)}>
      Count is {count}.
    </button>
  );
};

export default function Page() {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Button />
      <Button />
    </div>
  );
}
