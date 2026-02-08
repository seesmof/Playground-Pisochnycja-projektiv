"use client";

import { Verse, VerseType } from "@/components/Verse";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [verses, setVerses] = useState<VerseType[]>([
    {
      text: "Do not fear, for I am with you; Do not be afraid, for I am your God. I will strengthen you, I will also help you, I will also uphold you with My righteous right hand.",
      reference: "Isaiah 41:10",
    },
    {
      text: "For I know the plans that I have for you,’ declares the Lord, ‘plans for prosperity and not for disaster, to give you a future and a hope.",
      reference: "Jeremiah 29:11",
    },
    {
      text: "And we know that God causes all things to work together for good to those who love God, to those who are called according to His purpose.",
      reference: "Romans 8:28",
    },
  ]);

  return (
    <>
      <div className="min-h-screen p-3 bg-linear-to-br to-sky-50 flex items-center justify-center">
        <div className="bg-white rounded-md p-3 shadow-md flex gap-3 fixed bottom-4">
          <Link className="underline underline-offset-4" href="/about/">
            About
          </Link>
          <Link className="hover:underline underline-offset-4" href="/love/">
            Love
          </Link>
          <Link className="hover:underline underline-offset-4" href="/heaven/">
            Heaven
          </Link>
        </div>
        <div className="bg-white rounded-md p-3 shadow-md">
          <h1 className="text-2xl mb-2">About Us</h1>
          <p>
            This is a simple app that uses{" "}
            <a
              className="hover:underline underline-offset-4 text-sky-700"
              href="https://nextjs.org/docs"
              title="Next.js Documentation"
            >
              Next.js
            </a>{" "}
            to show Markdown files.
          </p>
          <h2 className="mt-4 mb-2 text-lg">Favorite Verses</h2>
          <div className="flex flex-col gap-3">
            {verses.map((verse) => (
              <Verse
                key={verse.reference}
                text={verse.text}
                reference={verse.reference}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
