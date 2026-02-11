"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const images: string[] = [
  "https://images.pexels.com/photos/16706765/pexels-photo-16706765.jpeg",
  "https://images.pexels.com/photos/8561771/pexels-photo-8561771.jpeg",
  "https://images.pexels.com/photos/11087830/pexels-photo-11087830.jpeg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentUrl, setCurrentUrl] = useState<string>(images[0]);

  const prevImage = () => {
    setCurrentImage(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };
  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") prevImage();
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextImage();
  };

  useEffect(() => {
    setCurrentUrl(images[currentImage]);
  }, [currentImage]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div className="bg-linear-to-br to-sky-50 min-h-screen flex items-center justify-center">
      <div className="max-w-xl flex flex-col items-center gap-2">
        <button className="btn" onClick={prevImage}>
          Prev
        </button>
        <Image
          src={currentUrl}
          width={1920}
          height={1080}
          alt="An image of a semi truck."
          className="max-h-100"
        />
        <button className="btn" onClick={nextImage}>
          Next
        </button>
      </div>
    </div>
  );
}
