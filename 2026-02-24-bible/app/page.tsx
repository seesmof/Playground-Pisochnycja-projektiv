"use client";

import { bookNames } from "@/data/consts";
import { useEffect, useState } from "react";

const translation = "HOM";
const baseUrl = "https://bolls.life/get-text";

interface Verse {
  primaryKey: number;
  verseNumber: number;
  verseText: string;
}

export default function Home() {
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [chapterContents, setChapterContents] = useState<Verse[]>([]);

  const fetchChapter = async () => {
    console.log(`${baseUrl}/HOM/43/${currentChapter}`);
    const response = await fetch(`${baseUrl}/HOM/43/${currentChapter}`);
    const data = await response.json();
    setChapterContents(data);
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md border border-sky-300 p-3">
        {chapterContents.map((verse) => (
          <div key={verse.primaryKey} className="flex flex-row gap-2">
            <small>{verse.verseNumber}</small>
            <p>{verse.verseText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
