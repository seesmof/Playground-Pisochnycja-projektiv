"use client";

import { useState } from "react";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="bg-green-50 min-h-screen p-3">
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {/* Nav Bar */}
        <nav className="bg-white rounded-md flex gap-3 p-3 justify-between">
          <button
            onClick={() => setSelectedTab(0)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 0 ? `underline` : ""}`}
          >
            Благодать
          </button>
          <button
            onClick={() => setSelectedTab(1)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 1 ? `underline` : ""}`}
          >
            Любов
          </button>
          <button
            onClick={() => setSelectedTab(2)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 2 ? `underline` : ""}`}
          >
            Радість
          </button>
          <button
            onClick={() => setSelectedTab(3)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 3 ? `underline` : ""}`}
          >
            Мир
          </button>
          <button
            onClick={() => setSelectedTab(4)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 4 ? `underline` : ""}`}
          >
            Віра
          </button>
          <button
            onClick={() => setSelectedTab(5)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 5 ? `underline` : ""}`}
          >
            Надія
          </button>
          <button
            onClick={() => setSelectedTab(6)}
            className={`hover:underline underline-offset-4 cursor-pointer ${selectedTab === 6 ? `underline` : ""}`}
          >
            Рай
          </button>
        </nav>

        {/* Main Content */}
        <main className="bg-white rounded-md p-3 flex flex-col gap-3"></main>
      </div>
    </div>
  );
}
