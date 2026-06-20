"use client";

import { useState } from "react";

interface Verse {
  text: string;
  reference: string;
}

export default function Page() {
  const [verses, setVerses] = useState<Verse[]>([
    {
      text: "For Whoever shall call upon the name of the LORD shall be saved",
      reference: "Romans 10:13",
    },
    {
      text: "Jesus wept.",
      reference: "John 11:35",
    },
  ]);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto flex flex-col gap-3 p-3 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {verses.map((verse, index) => (
            <div
              className="flex flex-col bg-white rounded-md p-3 h-fit"
              key={index}
            >
              <h3 className="font-bold">{verse.reference}</h3>
              <p className="mt-2">{verse.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
