"use client";

import { useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export default function Page() {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="flex mx-auto max-w-3xl p-3">
        <Button onClick={() => setIsHidden(!isHidden)}>
          {isHidden ? "Show" : "Hide"}
        </Button>
      </div>
      {!isHidden && (
        <div className="fixed bottom-3 right-3 bg-stone-900 text-stone-50 p-6 max-w-52 rounded-xl flex flex-col gap-3">
          <div className="flex justify-between items-center mb-4">
            <FaCookieBite />
            <button
              className="cursor-pointer"
              onClick={() => setIsHidden((isHidden) => !isHidden)}
            >
              <RxCross1 />
            </button>
          </div>
          <p>We use cookies to imporove your user experience.</p>
          <Button>I like Cookies</Button>
        </div>
      )}
    </div>
  );
}

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: any;
}) => {
  return (
    <button
      className="bg-stone-50 text-stone-900 w-full rounded-md py-2 cursor-pointer duration-150 hover:bg-stone-100 active:scale-95"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
