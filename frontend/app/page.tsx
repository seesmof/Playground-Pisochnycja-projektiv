"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function Page() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) {
      console.log("Didnt pass");
      return;
    }

    console.log("Passed the check");
    try {
      const response = await fetch(`${BACKEND_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, is_completed: false }),
      });
      const data = await response.json();
      setOutput(`Successfully created an object: ${data.task.content}`);
      console.log(`Successfully created an object: ${data.task.content}`);
    } catch (error) {
      setOutput("Failed to connect to FastAPI backend.");
      console.error(error);
    }
  };

  return (
    <div className="bg-sky-50 min-h-screen flex items-center justify-center p-24">
      <div className="bg-white rounded-md p-4">
        <form onSubmit={handleSubmit} className="flex gap-1">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit">Add</Button>
        </form>
        <div className="pt-12">{output && <p>{output}</p>}</div>
      </div>
    </div>
  );
}
