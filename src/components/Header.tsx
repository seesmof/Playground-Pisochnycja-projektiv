"use client";

import { Menu, X } from "@deemlol/next-icons";
import Link from "next/link";
import { useState } from "react";

interface MenuItemProps {
  href: string;
  content: string;
  isSelected: boolean;
}

const MenuItem = ({ href, content, isSelected = false }: MenuItemProps) => {
  return (
    <Link
      className={`${isSelected ? "bg-yellow-50 text-yellow-600" : ""} p-2 hover:bg-yellow-50 hover:text-yellow-600`}
      href={href}
    >
      {content}
    </Link>
  );
};

const links: MenuItemProps[] = [
  { href: "/", content: "Home", isSelected: true },
  { href: "/ai", content: "AI & Monorepos", isSelected: false },
  { href: "/synthetic", content: "Synthetic Monorepos", isSelected: false },
  { href: "/compare", content: "Compare", isSelected: false },
  { href: "/ts", content: "TypeScript", isSelected: false },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
  };

  return (
    <>
      <header className="flex justify-between items-center p-2 px-4 border-b border-stone-100 bg-white/90 top-0 sticky">
        <Link href={"/"}>
          <span className="font-bold">monorepo</span>
          <span className="text-yellow-600">.tools</span>
        </Link>
        <button
          className="cursor-pointer hover:bg-yellow-50 text-stone-600 hover:text-yellow-600 rounded p-2"
          onClick={handleMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {isMenuOpen ? (
        <div className="bg-white flex flex-col p-3 px-4 gap-1 border-b border-stone-100">
          {links.map((link, index) => (
            <MenuItem
              href={link.href}
              content={link.content}
              isSelected={link.isSelected}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
