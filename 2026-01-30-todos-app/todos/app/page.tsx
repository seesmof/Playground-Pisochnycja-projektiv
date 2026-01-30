"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <>
      <input
        className="input"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <p>Current text: {text}</p>
    </>
  );
}
