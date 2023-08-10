"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

interface CardProps {
  link: string;
  name: string;
  isDarkMode: boolean;
}

const Card = ({ link, name, isDarkMode }: CardProps) => {
  return (
    <>
      <Link
        href={`/modern-js-from-beginning-traversy-media/${link}`}
        className={`flex flex-row rounded-md items-center justify-between ${
          isDarkMode
            ? "bg-slate-800"
            : "bg-slate-50 shadow-xl shadow-slate-300 text-slate-800"
        }`}
      >
        <div className="flex flex-col p-4 gap-1">
          <h1 className="text-xl sm:text-2xl font-bold">{name}</h1>
          <p className="flex flex-row items-center">
            Preview <GoLinkExternal className="ml-2" />
          </p>
        </div>
      </Link>
    </>
  );
};

interface GalleryProps {
  Pages: any[];
  pageName: string;
}

const Gallery = ({ Pages, pageName }: GalleryProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      <div
        className={`min-h-screen p-4 md:p-6 ${
          isDarkMode
            ? "bg-slate-900 text-slate-100"
            : "bg-slate-100 text-slate-900"
        }`}
      >
        <div className="flex flex-col mx-auto max-w-4xl">
          <Navbar
            projectName={pageName}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 pt-4">
            {Pages.map((page) => (
              <Card
                key={page.name}
                link={page.link}
                name={page.name}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
