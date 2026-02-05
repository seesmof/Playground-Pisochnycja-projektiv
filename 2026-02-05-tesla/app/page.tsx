import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="bg-white justify-between items-center flex w-full p-3 sticky top-0">
        <p className="font-bold uppercase ml-5 text-lg tracking-widest">
          <Link href={"/"}>Tesla</Link>
        </p>
        <button className="btn">Menu</button>
      </nav>
      <section>
        <Image
          src={"/hero2.avif"}
          width={1920}
          height={1080}
          alt="An image of a Tesla Model 3"
        />
      </section>
    </>
  );
}
