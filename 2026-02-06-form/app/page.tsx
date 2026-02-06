"use client";

import { FormEvent, useState } from "react";

const formGroupContainerClasses = "flex flex-col gap-1";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validateUsername = (username: string): boolean => {
    const usernameRegex: RegExp = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setUsernameError(false);
    setEmailError(false);

    if (!validateUsername(username)) setUsernameError(true);
    if (!validateEmail(email)) setEmailError(true);

    setUsername("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-sky-50 p-3 flex items-center justify-center">
      <div className="bg-white rounded-md p-3 flex flex-col gap-3">
        <em className="text-lg hover:underline underline-offset-4 text-center">
          <a href="https://www.biblegateway.com/passage/?search=John%203%3A16&version=UKR;NIV">
            Jesus is LORD
          </a>
        </em>
        <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className={formGroupContainerClasses}>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              className={`${usernameError && "input-error"} input`}
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>{usernameError && "Please enter a correct username."}</p>
          </div>
          <div className={formGroupContainerClasses}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${emailError && "input-error"} input`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>{emailError && "Please enter a correct email."}</p>
          </div>
          <div className="flex gap-3 w-full">
            <button type="reset" className="btn btn-ghost">
              Reset
            </button>
            <button className="btn flex-1">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
