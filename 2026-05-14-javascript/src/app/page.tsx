"use client";

import { useState } from "react";

export default function Page() {
  const [date, setDate] = useState<string>("");

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow">
        <button>Show current date</button>
        <p>{date}</p>
      </div>
    </div>
  );
}
