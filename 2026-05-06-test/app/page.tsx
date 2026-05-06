"use client";

import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow p-3 flex flex-col gap-3 w-32">
        <button className="btn" onClick={() => setStatus(!status)}>
          Toggle
        </button>
        <p hidden={status}>Test String</p>
      </div>
    </div>
  );
}
