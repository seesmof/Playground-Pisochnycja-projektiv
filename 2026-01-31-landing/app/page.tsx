"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);

  return (
    <>
      <nav className="flex justify-between px-3 py-6 bg-white sticky top-0 z-10">
        <Link href={"/"} className="flex flex-row gap-3 font-thin">
          <Image
            src={"/volvo-icon.svg"}
            width={85}
            height={85}
            alt="An icon of Volvo."
          />
          Trucks
        </Link>
        <div className="flex flex-row gap-2 blur-2xl">
          <button>Search</button>
          <button>Menu</button>
        </div>
      </nav>
      <section className="bg-[url('/first.avif')] bg-no-repeat bg-center bg-cover min-h-80 mt-10"></section>
    </>
  );
}
