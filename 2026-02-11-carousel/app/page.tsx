"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const images: string[] = [
  "https://images.pexels.com/photos/30037629/pexels-photo-30037629.jpeg",
  "https://images.pexels.com/photos/16706765/pexels-photo-16706765.jpeg",
  "https://images.pexels.com/photos/33081220/pexels-photo-33081220.jpeg",
  "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg",
  "https://images.pexels.com/photos/8994766/pexels-photo-8994766.jpeg",
  "https://images.pexels.com/photos/11087837/pexels-photo-11087837.jpeg",
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
    <div className="bg-sky-50 min-h-screen flex flex-col items-center justify-center gap-3">
      <button className="btn" onClick={prevImage}>
        Prev
      </button>
      <div className="max-h-240 overflow-clip">
        <Image
          src={currentUrl}
          width={1920}
          height={1080}
          alt="An image of a semi truck."
          className="object-cover object-bottom"
        />
      </div>
      <button className="btn" onClick={nextImage}>
        Next
      </button>
    </div>
  );
}
