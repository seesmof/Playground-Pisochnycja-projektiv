"use client";

import { Menu } from "@deemlol/next-icons";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
  };

  return (
    <header className="flex justify-between items-center p-2 px-4 border-b border-stone-100 bg-white/50">
      <Link href={"/"}>
        <span className="font-bold">monorepo</span>
        <span className="text-yellow-500">.tools</span>
      </Link>
      <button
        className="cursor-pointer hover:bg-yellow-50 text-stone-500 hover:text-yellow-500 rounded p-2"
        onClick={handleMenuOpen}
      >
        <Menu />
      </button>
    </header>
  );
}
