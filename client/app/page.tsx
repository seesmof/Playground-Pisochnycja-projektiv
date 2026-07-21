"use client";

import { useState } from "react";

const categories: string[] = ["Flat", "House", "Duplex"];

interface Listing {
  category: string;
  name: string;
  description?: string;
}

const listings: Listing[] = [
  {
    category: "Flat",
    name: "A nice flat near downtown",
    description:
      "For God so loved the world that He gave His only begotten Son that whoever believes in Him shall not perish but have eternal life.",
  },
  {
    category: "Duplex",
    name: "A clean duplex near the highway",
    description: "For whoever calls on the Name of the Lord will be saved.",
  },
  {
    category: "House",
    name: "A good house in a sleepy neighborhood",
    description:
      "Truly truly I say to you: he who believes in Me has eternal life.",
  },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Flat");

  return (
    <div className="p-3 mx-auto max-w-md w-full flex flex-col gap-3">
      <div className="flex gap-1">
        {categories.map((category, index) => (
          <button
            className="px-2 rounded-md bg-stone-200 hover:bg-stone-300 duration-300 cursor-pointer"
            key={index}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {listings
          .filter((listing) => listing.category === selectedCategory)
          .map((listing, index) => (
            <div
              className="rounded-md border flex flex-col w-full p-3 gap-3"
              key={index}
            >
              <h2 className="text-lg">{listing.name}</h2>
              <p>{listing.description}</p>
              <span className="italic">{listing.category}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
