"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      const url = "http://127.0.0.1:8000/";
      const response = await fetch(url);
      const data: { message: string } = await response.json();
      setMessage(data.message);
    };
    fetchMessage();
  }, []);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="container mx-auto p-5">
        <div className="bg-white rounded-md p-5 shadow">
          <h1 className="font-bold">Hey! Here is your message:</h1>
          <p className="mt-2">{message || "Waiting for the message..."}</p>
        </div>
      </div>
    </div>
  );
}
