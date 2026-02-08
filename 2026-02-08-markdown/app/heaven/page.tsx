"use client";

import { Verse, VerseType } from "@/components/Verse";
import { useState } from "react";
import Link from "next/link";

export default function Heaven() {
  const [verses, setVerses] = useState<VerseType[]>([
    {
      text: "In my Father's house are many rooms. If it were not so, would I have told you that I go to prepare a place for you?",
      reference: "John 14:2",
    },
    {
      text: "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.”",
      reference: "Revelation 21:4",
    },
    {
      text: "But, as it is written, “What no eye has seen, nor ear heard, nor the heart of man imagined, what God has prepared for those who love him”—",
      reference: "1 Corinthians 2:9",
    },
  ]);

  return (
    <>
      <div className="min-h-screen p-3 bg-linear-to-br to-sky-50 flex items-center justify-center">
        <div className="bg-white rounded-md p-3 shadow-md flex gap-3 fixed bottom-4">
          <Link
            className="hover:underline underline-offset-4 decoration-sky-700"
            href="/"
          >
            About
          </Link>
          <Link
            className="hover:underline underline-offset-4 decoration-sky-700"
            href="/love/"
          >
            Love
          </Link>
          <Link
            className="underline underline-offset-4 decoration-sky-700"
            href="/heaven/"
          >
            Heaven
          </Link>
        </div>
        <div className="bg-white rounded-md p-3 shadow-md max-w-3xl">
          <h2 className="mb-2 text-lg">
            Verses about{" "}
            <Link
              href={"https://www.openbible.info/topics/heaven"}
              className="hover:underline underline-offset-4 decoration-sky-700"
            >
              Heaven
            </Link>
          </h2>
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
