"use client";

import { useState } from "react";

export default function Page() {
  const [len, setLen] = useState<number>(0);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="flex flex-col gap-3 p-3 mx-auto max-w-3xl">
        <div className="bg-white rounded-md p-3 relative">
          <textarea
            name="input"
            id="input"
            maxLength={250}
            className={`textarea w-full resize-none ${len === 250 && "text-red-700 outline-red-700"}`}
            rows={4}
            onChange={(e) => setLen(e.target.value.length)}
          ></textarea>
          <div
            className={`absolute bottom-5 right-5 ${len === 250 && "text-red-700"}`}
          >
            {len}/250
          </div>
        </div>
      </div>
    </div>
  );
}
