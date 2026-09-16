"use client";

import { useEffect, useState } from "react";

export default function PageProgress() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage = (scrollTop / documentHeight) * 100;

      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-40 h-1 w-full bg-transparent">
      <div
        className="h-full bg-orange-600 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
