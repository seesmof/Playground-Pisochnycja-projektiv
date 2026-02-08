import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href={"/about/"}>About Us</Link>
        <Link href={"/love/"}>Love</Link>
      </li>
    </ul>
  );
}
