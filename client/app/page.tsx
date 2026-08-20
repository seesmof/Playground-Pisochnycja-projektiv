"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
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
          <h1 className="font-bold hover:underline underline-offset-4">
            <Link href={"/"}>Where in the world?</Link>
          </h1>
          <button
            className={`cursor-pointer p-3 rounded-md flex gap-3 ${isDark ? "hover:bg-slate-700" : "hover:bg-stone-100"}`}
            onClick={() => setIsDark((isDark) => !isDark)}
          >
            {isDark ? <Sun /> : <Moon />}
            <p className="hidden sm:block">
              {isDark ? "Light Mode" : "Dark Mode"}
            </p>
          </button>
        </div>
      </nav>
    </div>
  );
}
