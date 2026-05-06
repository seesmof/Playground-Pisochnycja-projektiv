"use client";

import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <div className="bg-sky-50 min-h-screen flex flex-col items-center justify-center">
      <button
        className={`rounded-md shadow p-3 cursor-pointer ${status ? "bg-amber-500" : "bg-white"}`}
        onClick={() => {
          setStatus((status) => !status);
        }}
      >
        Click.
      </button>
    </div>
  );
}
