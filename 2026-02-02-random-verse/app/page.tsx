"use client";

import { useEffect, useState } from "react";

interface Verse {
  primaryKey: number;
  translation: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}
const url = "https://bolls.life/get-random-verse/UBIO/";

export default function Home() {
  const [verse, setVerse] = useState("");

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(url);
      const result: Verse = await response.json();
      setVerse(result.text);
    }

    startFetching();
  }, []);

  return (
    <div className="h-screen bg-sky-100 flex flex-col justify-center items-center p-3">
      <div className="card bg-white">
        <div className="card-body">
          <p>{verse}</p>
        </div>
      </div>
    </div>
  );
}
