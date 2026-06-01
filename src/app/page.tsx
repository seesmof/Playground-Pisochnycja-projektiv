"use client";

import Link from "next/link";
import { useState } from "react";

interface Post {
  author: string;
  content: string;
}

const posts: Post[] = [
  {
    author: "Linnie Coleman",
    content:
      "“For I take no pleasure in the death of anyone who dies,” declares the Lord God. “Therefore, repent and live!”",
  },
  {
    author: "Lois Gray",
    content:
      "Every word of God proves true; he is a shield to those who take refuge in him.",
  },
  {
    author: "Edna Welch",
    content:
      "For as in one body we have many members, and the members do not all have the same function, so we, though many, are one body in Christ, and individually members one of another.",
  },
  {
    author: "Samuel Young",
    content:
      "But for you who fear my name, the sun of righteousness shall rise with healing in its wings. You shall go out leaping like calves from the stall.",
  },
  {
    author: "Landon Webster",
    content:
      "“No man shall be able to stand before you all the days of your life. Just as I was with Moses, so I will be with you. I will not leave you or forsake you.”",
  },
  {
    author: "Jane Joseph",
    content:
      "Everyone who goes on ahead and does not abide in the teaching of Christ, does not have God. Whoever abides in the teaching has both the Father and the Son.",
  },
];

export default function Page() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="bg-white">
      <header className="mx-auto max-w-3xl mt-3 sticky top-3 bg-white z-50 flex justify-between items-center p-3 outline rounded-md outline-stone-300">
        <h1 className="font-bold tracking-tight hover:underline underline-offset-4 cursor-pointer">
          <Link href={"/"}>Poster</Link>
        </h1>
        <button className="hover:underline underline-offset-4 cursor-pointer">
          <Link href={"/profile"}>Profile</Link>
        </button>
      </header>
      <main className="mx-auto max-w-3xl">
        <form>
          <input
            type="text"
            className="px-3 py-1 w-full my-3 rounded-md outline-stone-300 outline focus:outline-2"
            placeholder="Please enter your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {posts
            .filter((post) =>
              post.content.toLowerCase().includes(input.toLowerCase()),
            )
            .map((post, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-md outline outline-stone-300 flex-col flex"
              >
                <blockquote className="text-lg">{post.content}</blockquote>
                <cite className="self-end">{post.author}</cite>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
