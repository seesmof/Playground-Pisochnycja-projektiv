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
const url = "https://bolls.life/get-random-verse/";

export default function Home() {
  const [verse, setVerse] = useState("");

  const fetchVerse = async () => {
    try {
      const response = await fetch(url);
      const result: Verse = await response.json();
      setVerse(result.text);
      console.log(result.text);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return <p>{verse}</p>;
}
