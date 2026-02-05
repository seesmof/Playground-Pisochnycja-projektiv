"use client";

import { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-sky-50 h-screen flex items-center justify-center flex-col gap-3">
      <form className="bg-white shadow rounded-md p-3 flex flex-col gap-3 w-60">
        <input
          className="input"
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your user's name..."
        />
        <input
          type="email"
          className="input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email here..."
        />
      </form>
      <div className="bg-white flex flex-col gap-3 p-3 shadow w-60 text-sm">
        <p>User name: {userName ? userName : "empty"}</p>
        <p>Email: {email ? email : "empty"}</p>
      </div>
    </div>
  );
}
