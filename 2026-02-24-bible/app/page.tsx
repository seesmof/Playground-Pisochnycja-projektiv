"use client";

import { bookNames, chapterNumbers } from "@/data/consts";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentBook, setCurrentBook] = useState<number>(43);
  const [currentChapter, setCurrentChapter] = useState<number>(1);

  const previousChapter = () => {
    if (currentChapter > 1) setCurrentChapter((prevNumber) => prevNumber - 1);
    else {
      const previousBook = currentBook - 1;
      setCurrentBook((prevBook) => prevBook - 1);
      setCurrentChapter(
        chapterNumbers[previousBook as keyof typeof chapterNumbers],
      );
    }
  };

  const nextChapter = () => {
    const booksChapters =
      chapterNumbers[currentBook as keyof typeof chapterNumbers];
    if (currentChapter < booksChapters)
      setCurrentChapter((prevNumber) => prevNumber + 1);
    else {
      setCurrentBook((prevBook) => prevBook + 1);
      setCurrentChapter(1);
    }
  };

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-md border border-sky-300 p-3 flex flex-row items-center gap-3">
        <button className="btn" onClick={previousChapter}>
          Prev
        </button>
        <p>
          {bookNames[currentBook as keyof typeof bookNames]} {currentChapter}
        </p>
        <button className="btn" onClick={nextChapter}>
          Next
        </button>
      </div>
    </div>
  );
}
