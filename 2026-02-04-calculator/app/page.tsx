"use client";

import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  const handleSolve = () => {
    const result = eval(value);
    setValue(result);
  };

  return (
    <div className="bg-sky-50 flex items-center justify-center h-screen">
      <div className="bg-white rounded-md p-3 gap-2 flex flex-col">
        <input
          type="text"
          className="input text-end"
          readOnly
          onClick={() => navigator.clipboard.writeText(value)}
          value={value}
        />
        <div className="grid gap-2 grid-cols-4 grid-rows-4">
          <button onClick={() => setValue("")} className="btn col-span-4">
            Clean
          </button>
          <button
            onClick={() => setValue(value + "7")}
            className="btn col-span-1"
          >
            7
          </button>
          <button
            onClick={() => setValue(value + "8")}
            className="btn col-span-1"
          >
            8
          </button>
          <button
            onClick={() => setValue(value + "9")}
            className="btn col-span-1"
          >
            9
          </button>
          <button
            onClick={() => setValue(value + "/")}
            className="btn col-span-1"
          >
            /
          </button>
          <button
            onClick={() => setValue(value + "4")}
            className="btn col-span-1"
          >
            4
          </button>
          <button
            onClick={() => setValue(value + "5")}
            className="btn col-span-1"
          >
            5
          </button>
          <button
            onClick={() => setValue(value + "6")}
            className="btn col-span-1"
          >
            6
          </button>
          <button
            onClick={() => setValue(value + "*")}
            className="btn col-span-1"
          >
            *
          </button>
          <button
            onClick={() => setValue(value + "1")}
            className="btn col-span-1"
          >
            1
          </button>
          <button
            onClick={() => setValue(value + "2")}
            className="btn col-span-1"
          >
            2
          </button>
          <button
            onClick={() => setValue(value + "3")}
            className="btn col-span-1"
          >
            3
          </button>
          <button
            onClick={() => setValue(value + "-")}
            className="btn col-span-1"
          >
            -
          </button>
          <button
            onClick={() => setValue(value + "0")}
            className="btn col-span-1"
          >
            0
          </button>
          <button
            onClick={() => setValue(value + ".")}
            className="btn col-span-1"
          >
            ,
          </button>
          <button onClick={() => handleSolve()} className="btn col-span-1">
            =
          </button>
          <button
            onClick={() => setValue(value + "+")}
            className="btn col-span-1"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
