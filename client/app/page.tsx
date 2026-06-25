"use client";

import { useState } from "react";

interface Question {
  n: number;
  q: string;
  a: string;
}

const questions: Question[] = [
  { n: 1, q: "Хто був у череві риби три дні та три ночі?", a: "Йона" },
  {
    n: 2,
    q: "Хто нагодував 5 тисяч людей хлібом і рибками?",
    a: "Ісус Христос",
  },
  { n: 3, q: "Хто відрікся Господа Ісуса три рази?", a: "Петро" },
  { n: 4, q: "Хто бачив Господа у видінні з неба?", a: "Павло" },
  { n: 5, q: "Хто був першим Християнським мученником?", a: "Степан" },
];

export default function Page() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="flex mx-auto max-w-3xl p-3">
        {!isStarted ? (
          <div className="bg-white p-3 md:p-7 w-full">
            <h1 className="font-bold text-3xl">Bible Quiz</h1>
            <p className="my-4">
              This is a quiz about the Holy Bible. Press Start to begin.
            </p>
            <button
              onClick={() => {
                setIsStarted(true);
                setSelectedQuestion(1);
              }}
              className="btn btn-primary w-full"
            >
              Start
            </button>
          </div>
        ) : selectedQuestion === 1 ? (
          <div className="flex flex-col gap-3">
            <Navbar />
            <div className="bg-white p-3 md:p-7 w-full">
              <h2 className="font-bold">{questions[0].q}</h2>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const Navbar = ({ selected }: { selected: string }) => {
  return (
    <nav className="flex justify-between bg-white">
      {questions.map((q, index) => (
        <button key={index}>{q.n}</button>
      ))}
    </nav>
  );
};
