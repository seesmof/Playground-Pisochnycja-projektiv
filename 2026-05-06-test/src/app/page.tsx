"use client";

import { useState } from "react";

export interface CardProps {
  title: string;
  message: string;
}

const Card = ({ title, message }: CardProps) => {
  return (
    <div className="bg-white rounded-md shadow p-3">
      <h2 className="font-bold">{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default function Page() {
  const [data, setData] = useState<CardProps[]>([
    { title: "Some news out there", message: "Here is some text" },
    { title: "Title of other news", message: "Some text more here" },
    { title: "News here and there", message: "Text about new news" },
  ]);

  return (
    <div className="bg-sky-50 min-h-screen flex flex-row">
      <div className="flex flex-col p-3 gap-3 w-full">
        {data.map((item, index) => (
          <Card key={index} title={item.title} message={item.message} />
        ))}
      </div>
    </div>
  );
}
