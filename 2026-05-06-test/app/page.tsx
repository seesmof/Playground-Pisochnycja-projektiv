"use client";

import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <div className="flex flex-col p-3 gap-3">
      <button className="btn" onClick={() => setStatus(!status)}>
        Click
      </button>
      {status && <p>Some text.</p>}
    </div>
  );
}
