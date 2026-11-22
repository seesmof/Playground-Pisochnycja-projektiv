"use client";

import { useState } from "react";

const mockChapterData: Verse[] = [
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  { number: 1, content: "For God so loved the world" },
  {
    number: 2,
    content: "For whoever calls on the name of the Lord will be saved",
  },
  {
    number: 3,
    content: "Jesus wept.",
  },
];

export type Verse = {
  number: number;
  content: string;
};

export default function MainPage() {
  const [thisChapterVerses, setThisChapterVerses] = useState<Verse[] | null>(
    mockChapterData,
  );

  return (
    <div className="bg-sky-50 h-screen">
      <div className="mx-auto max-w-3xl p-3 flex flex-col gap-3 h-screen">
        <main className="bg-white rounded-md p-3 flex-1 overflow-y-scroll">
          {thisChapterVerses ? (
            thisChapterVerses.map((verse, index) => (
              <p key={index}>
                <small>{verse.number}</small> {verse.content}
              </p>
            ))
          ) : (
            <p>Не знайдено віршів для цього розділу.</p>
          )}
        </main>
        <nav className="flex justify-between items-center bg-white p-3 gap-3 rounded-md">
          <button className="btn flex-1">Назад</button>
          <button className="btn flex-1">Розділ</button>
          <button className="btn flex-1">Вперед</button>
        </nav>
      </div>
    </div>
  );
}
