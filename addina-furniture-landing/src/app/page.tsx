import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";

export default function Home() {
  return (
    <nav className="flex flex-row justify-between p-4">
      <Link href={"/"}>
        <Image
          height={121}
          width={121}
          src={"/logo.svg"}
          alt="A website logo showing a couch and a text that says Addina"
        ></Image>
      </Link>
      <div className="flex flex-row gap-4">
        <FiHeart size={30}></FiHeart>
        <FiInbox size={30}></FiInbox>
        <HiBars3BottomRight size={32}></HiBars3BottomRight>
      </div>
      <div className="background-[f6f4ee] p-3"></div>
    </nav>
  );
}
