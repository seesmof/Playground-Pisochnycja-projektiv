import Link from "next/link";

interface LinkType {
  text: string;
  href: string;
}

const links: LinkType[] = [
  { text: "Garage", href: "/garage" },
  { text: "Store", href: "/" },
  { text: "Bank", href: "/bank" },
];

export default function Header() {
  return (
    <nav className="justify-between flex outline-2 p-3">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="hover:underline underline-offset-4"
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
