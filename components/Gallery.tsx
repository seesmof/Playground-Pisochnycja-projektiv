"use client";
import React, { useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

interface GalleryProps {
  Projects: any[];
  projectName: string;
}

const Gallery = ({ Projects, projectName }: GalleryProps) => {
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
            projectName={projectName}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 pt-4">
            {Projects.map((project) => (
              <Card
                key={project.name}
                link={project.link}
                name={project.name}
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
