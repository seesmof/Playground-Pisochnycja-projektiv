"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  const handleSolve = () => {
    let result;
    try {
      result = eval(value);
    } catch {
      console.error("Failed to evaluate an expression.");
    }
    setValue(result);
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "Backspace") setValue("");
    if (event.key === "Enter") handleSolve();

    if (event.key === "." || event.key === ",") setValue(value + ".");
    if (event.key === "/" || event.key === "\\") setValue(value + "/");
    if (event.key === "*") setValue(value + "*");
    if (event.key === "-") setValue(value + "-");
    if (event.key === "+") setValue(value + "+");

    if (event.key === "1") setValue(value + "1");
    if (event.key === "2") setValue(value + "2");
    if (event.key === "3") setValue(value + "3");
    if (event.key === "4") setValue(value + "4");
    if (event.key === "5") setValue(value + "5");
    if (event.key === "6") setValue(value + "6");
    if (event.key === "7") setValue(value + "7");
    if (event.key === "8") setValue(value + "8");
    if (event.key === "9") setValue(value + "9");
    if (event.key === "0") setValue(value + "0");
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [value]);

  return (
    <div className="bg-sky-50 flex items-center justify-center min-h-screen">
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
