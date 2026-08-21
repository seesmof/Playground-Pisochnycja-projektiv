"use client";

import { FormEvent, useState } from "react";

export type Post = {
  message: string;
  author: string;
};

export default function IndexPage() {
  const [input, setInput] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([
    { message: "Hey there! Jesus is LORD.", author: "Oleh" },
    { message: "Hello. Christ is KING", author: "Seesm" },
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: Post = { message: input, author: "me" };
    setPosts([newPost, ...posts]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-5 flex flex-col gap-5">
        {/* Input Field */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md p-5 shadow outline outline-stone-200"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input w-full"
            placeholder="Type your comment here..."
          />
        </form>

        {/* Output Field */}
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-md p-5 shadow outline outline-stone-200"
          >
            <p>{post.message}</p>
            <cite className="">{post.author}</cite>
          </div>
        ))}
      </div>
    </div>
  );
}
