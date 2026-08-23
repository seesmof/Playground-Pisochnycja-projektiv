"use client";

import { useState } from "react";

export type Data = {
  name: string;
  email: string;
  age: number;
  salary: number;
};

const initialData: Data[] = [
  { name: "Aaron Townsend", email: "zufe@kohbe.tn", age: 36, salary: 1808 },
  { name: "Cecilia Fields", email: "za@ite.gq", age: 31, salary: 2894 },
  { name: "Nancy Bishop", email: "ohefo@biwniecu.tc", age: 54, salary: 2963 },
  { name: "Lucille Lawrence", email: "zi@hi.wf", age: 55, salary: 1649 },
  { name: "Maud Sutton", email: "wa@zuf.pe", age: 60, salary: 1629 },
  { name: "Clayton Moore", email: "udzo@ven.bw", age: 47, salary: 2858 },
  { name: "Allie Norton", email: "ew@oto.ht", age: 55, salary: 2013 },
];

export default function Page() {
  const [sortedColumn, setSortedColumn] = useState<
    "name" | "email" | "age" | "salary" | null
  >(null);
  const [direction, setDirection] = useState<"ascending" | "descending">(
    "ascending",
  );

  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="container mx-auto px-4 py-2">
        <table className="table bg-white">
          <thead>
            <tr>
              <th
                className={`${sortedColumn === "name" ? "underline underline-offset-4" : ""} cursor-pointer`}
                onClick={() => {
                  setDirection((direction) =>
                    direction === "ascending" ? "descending" : "ascending",
                  );
                  setSortedColumn("name");
                }}
              >
                Name
              </th>
              <th
                className={`${sortedColumn === "email" ? "underline underline-offset-4" : ""} cursor-pointer`}
                onClick={() => {
                  setDirection((direction) =>
                    direction === "ascending" ? "descending" : "ascending",
                  );
                  setSortedColumn("email");
                }}
              >
                Email
              </th>
              <th
                className={`${sortedColumn === "age" ? "underline underline-offset-4" : ""} cursor-pointer`}
                onClick={() => {
                  setDirection((direction) =>
                    direction === "ascending" ? "descending" : "ascending",
                  );
                  setSortedColumn("age");
                }}
              >
                Age
              </th>
              <th
                className={`${sortedColumn === "salary" ? "underline underline-offset-4" : ""} cursor-pointer`}
                onClick={() => {
                  setDirection((direction) =>
                    direction === "ascending" ? "descending" : "ascending",
                  );
                  setSortedColumn("salary");
                }}
              >
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {(sortedColumn === "name"
              ? initialData.sort((one, two) =>
                  direction === "ascending"
                    ? one.name.localeCompare(two.name)
                    : two.name.localeCompare(one.name),
                )
              : sortedColumn === "email"
                ? initialData.sort((one, two) =>
                    direction === "ascending"
                      ? one.email.localeCompare(two.email)
                      : two.email.localeCompare(one.email),
                  )
                : sortedColumn === "age"
                  ? initialData.sort((one, two) =>
                      direction === "ascending"
                        ? one.age - two.age
                        : two.age - one.age,
                    )
                  : sortedColumn === "salary"
                    ? initialData.sort((one, two) =>
                        direction === "ascending"
                          ? one.salary - two.salary
                          : two.salary - one.salary,
                      )
                    : initialData
            ).map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>{data.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
