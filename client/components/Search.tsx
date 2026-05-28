"use client";

import { useState } from "react";

const cars: string[] = [
  "Tesla",
  "Mercedes-Benz",
  "Toyota",
  "Renault",
  "Volkswagen",
  "Honda",
  "Ford",
  "Jeep",
  "Porsche",
  "Ferrari",
  "Jaguar",
  "Mazda",
  "Kia",
  "Bentley",
  "Dodge",
];

const Search = () => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        className="input w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cars
          .filter((car) => car.toLowerCase().includes(input.toLowerCase()))
          .map((car, index) => (
            <div
              key={index}
              className="rounded-md outline outline-stone-300 p-3"
            >
              {car}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
