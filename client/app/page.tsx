"use client";

import { useState } from "react";

type Category = "Todo" | "Doing" | "Done";

type Todo = {
  title: string;
  category: Category;
};

const initialData: Todo[] = [
  { title: "Finish this app", category: "Todo" },
  { title: "To cook dinner", category: "Todo" },
  { title: "Writing this app", category: "Doing" },
  { title: "Cooking dinner", category: "Doing" },
  { title: "Planning the masters diploma project", category: "Doing" },
  { title: "Research network hardware", category: "Done" },
];

export default function Page() {
  const [data, setData] = useState<Todo[]>(initialData);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white shadow flex gap-3 p-5">
          <div className="border border-sky-600 flex-1 p-3 rounded-md">
            <h2 className="font-bold mb-3">Todo</h2>
            <div className="gap-3 flex flex-col">
              {data
                .filter((point) => point.category === "Todo")
                .map((item, index) => (
                  <div
                    className="border border-sky-600 rounded-md p-3"
                    key={index}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-sky-600 flex-1 p-3 rounded-md">
            <h2 className="font-bold mb-3">Doing</h2>
            <div className="gap-3 flex flex-col">
              {data
                .filter((point) => point.category === "Doing")
                .map((item, index) => (
                  <div
                    className="border border-sky-600 rounded-md p-3"
                    key={index}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-sky-600 flex-1 p-3 rounded-md">
            <h2 className="font-bold mb-3">Done</h2>
            <div className="gap-3 flex flex-col">
              {data
                .filter((point) => point.category === "Done")
                .map((item, index) => (
                  <div
                    className="border border-sky-600 rounded-md p-3"
                    key={index}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
