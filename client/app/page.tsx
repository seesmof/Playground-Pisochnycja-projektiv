"use client";

import { useState } from "react";

type Category = "Todo" | "Doing" | "Done";

type Todo = {
  title: string;
  isDone: boolean;
  category: Category;
};

const initialData: Todo[] = [
  { title: "Finish this app", isDone: false, category: "Todo" },
  { title: "Writing this app", isDone: false, category: "Doing" },
  { title: "Research network hardware", isDone: true, category: "Done" },
];

export default function Page() {
  const [data, setData] = useState<Todo[]>(initialData);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-white shadow flex gap-3 p-5">
          <div className="border-2 border-sky-600 flex-1 p-3 rounded-md">
            <h2 className="font-bold">Todo</h2>
            {data
              .filter((point) => point.category === "Todo")
              .map((item, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    readOnly
                    value={item.title}
                  />
                </div>
              ))}
          </div>
          <div className="border-2 border-sky-600 flex-1 p-3 rounded-md">
            <h2 className="font-bold">Doing</h2>
            {data
              .filter((point) => point.category === "Doing")
              .map((item, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    readOnly
                    value={item.title}
                  />
                </div>
              ))}
          </div>
          <div className="border-2 border-sky-600 flex-1 p-3 rounded-md">
            <h2 className="font-bold">Done</h2>
            {data
              .filter((point) => point.category === "Done")
              .map((item, index) => (
                <div className="flex items-center gap-1" key={index}>
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    readOnly
                    value={item.title}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
