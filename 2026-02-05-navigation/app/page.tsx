"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("One");

  return (
    <div className="bg-sky-50 min-h-screen p-3">
      <p>Jesus is LORD</p>
      <p>{value}</p>
      <div className="fixed bg-white rounded-md m-3 p-3 bottom-0 right-0 flex gap-3">
        <Link className="underline underline-offset-4" href={"/one"}>
          One
        </Link>
        <Link className="hover:underline underline-offset-4" href={"/two"}>
          Two
        </Link>
        <Link className="hover:underline underline-offset-4" href={"/three"}>
          Three
        </Link>
      </div>
    </div>
  );
}
