"use client";

import { useState } from "react";

export default function Page() {
  return (
    <div className="p-3 gap-3">
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
      <p className="my-4">This is a simple tic tac toe game app.</p>
      <div className="grid grid-cols-3 grid-rows-3 gap-3">
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>

        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>

        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
        <button className="outline active:scale-95 aspect-square cursor-pointer rounded-md">
          X
        </button>
      </div>
    </div>
  );
}
