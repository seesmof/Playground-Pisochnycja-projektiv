"use client";

import { useState } from "react";

const options: string[] = ["Volvo", "DAF", "Scania", "Mercedes", "Renault"];

export default function Select() {
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <>
      <select
        name="optionsSelect"
        id="optionsSelect"
        className="select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>{selected}</p>
    </>
  );
}
