"use client";

import { useState } from "react";

const Page = () => {
  const [data, setData] = useState<string>("Hi");

  return (
    <section className="p-3">
      <button
        onClick={() => {
          setData("Help");
        }}
        className="btn"
      >
        Click
      </button>
      <p>{data}</p>
    </section>
  );
};

export default Page;
