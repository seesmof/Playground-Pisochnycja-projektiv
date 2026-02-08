"use client";

import { Verse, VerseType } from "@/components/Verse";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [verses, setVerses] = useState<VerseType[]>([
    {
      text: "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful; it does not rejoice at wrongdoing, but rejoices with the truth. Love bears all things, believes all things, hopes all things, endures all things. Love never ends. As for prophecies, they will pass away; as for tongues, they will cease; as for knowledge, it will pass away.",
      reference: "1 Corinthians 13:4-8",
    },
    {
      text: "Let all that you do be done in love.",
      reference: "1 Corinthians 16:14",
    },
    {
      text: "“For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      reference: "John 3:16",
    },
  ]);

  return (
    <>
      <div className="min-h-screen p-3 bg-linear-to-br to-sky-50 flex items-center justify-center">
        <div className="bg-white rounded-md p-3 shadow-md flex gap-3 fixed bottom-4">
          <Link
            className="hover:underline underline-offset-4 decoration-sky-700"
            href="/about/"
          >
            About
          </Link>
          <Link
            className="underline underline-offset-4 decoration-sky-700"
            href="/love/"
          >
            Love
          </Link>
          <Link
            className="hover:underline underline-offset-4 decoration-sky-700"
            href="/heaven/"
          >
            Heaven
          </Link>
        </div>
        <div className="bg-white rounded-md p-3 shadow-md max-w-3xl">
          <h2 className="mb-2 text-lg">
            Verses about{" "}
            <Link
              href={"https://www.openbible.info/topics/love"}
              className="hover:underline underline-offset-4 decoration-sky-700"
            >
              Love
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
