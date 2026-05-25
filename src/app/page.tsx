"use client";

import React, { useState } from "react";

interface Response {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts/";

export default function Page() {
  const [idInput, setIdInput] = useState<number>(1);
  const [data, setData] = useState<Response | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const url = `${API_URL}${idInput}`;
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="mx-auto max-w-7xl w-full p-3 min-h-screen flex flex-col gap-3">
      <form className="flex flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="number"
          value={idInput}
          onChange={(e) => setIdInput(Number(e.target.value))}
          className="input w-full"
        />
        <button className="btn">Fetch</button>
      </form>
      {data ? (
        <div className="card shadow">
          <div className="card-body">
            <h2 className="font-bold text-xl mb-3">{data.title}</h2>
            <p>{data.body}</p>
          </div>
        </div>
      ) : (
        <span>No data yet...</span>
      )}
    </div>
  );
}
