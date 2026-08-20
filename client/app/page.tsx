"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function IndexPage() {
  const [isDark, setIsDark] = useState<boolean>(false);
  return (
    <div
      className={`min-h-screen ${isDark ? "bg-slate-700 text-white" : "bg-stone-50"}`}
    >
      <nav
        className={`sticky top-0 border-b-2 ${isDark ? "bg-slate-800 border-slate-900" : "bg-white"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="font-bold">Where in the world?</h1>
          <button
            className="cursor-pointer p-3"
            onClick={() => setIsDark((isDark) => !isDark)}
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>
    </div>
  );
}
