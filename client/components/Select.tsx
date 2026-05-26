"use client";

import { useState } from "react";

const options: string[] = ["Volvo", "DAF", "Scania", "Mercedes", "Renault"];

export default function Select() {
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <section className="bg-white rounded-md p-3 shadow flex flex-row gap-3">
      <select
        name="optionsSelect"
        id="optionsSelect"
        className="select flex-1"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input type="text" className="input" value={selected} readOnly disabled />
    </section>
  );
}
