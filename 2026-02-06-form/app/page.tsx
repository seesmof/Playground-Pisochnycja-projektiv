"use client";

import { useState } from "react";

const formGroupContainerClasses = "flex flex-col gap-1";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-sky-50 p-3 flex items-center justify-center">
      <div className="bg-white rounded-md p-3 flex flex-col gap-3">
        <em className="text-lg hover:underline underline-offset-4 text-center">
          <a href="https://www.biblegateway.com/passage/?search=John%203%3A16&version=UKR;NIV">
            Jesus is LORD
          </a>
        </em>
        <form className=" flex flex-col gap-3">
          <div className={formGroupContainerClasses}>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              className="input"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={formGroupContainerClasses}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
