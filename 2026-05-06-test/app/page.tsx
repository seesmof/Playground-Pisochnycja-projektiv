"use client";

import { useState } from "react";

interface ProfileProps {
  id: number;
  name: string;
  age: number;
}

const Profile = ({ id, name, age }: ProfileProps) => {
  return (
    <div className="bg-white rounded-md shadow p-3 flex-col flex">
      <h2 className="font-bold">{name}</h2>
      <p className="italic">{age}</p>
    </div>
  );
};

export default function Page() {
  const [data, setData] = useState<ProfileProps[]>([
    { id: 1, name: "Nell", age: 47 },
    { id: 2, name: "Jorge", age: 60 },
    { id: 3, name: "Ethan", age: 48 },
    { id: 4, name: "Russell", age: 47 },
    { id: 5, name: "Myrtle", age: 39 },
  ]);

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="flex flex-col gap-3 p-3">
        {data.map((object) => (
          <Profile
            id={object.id}
            key={object.id}
            name={object.name}
            age={object.age}
          />
        ))}
      </div>
    </div>
  );
}
