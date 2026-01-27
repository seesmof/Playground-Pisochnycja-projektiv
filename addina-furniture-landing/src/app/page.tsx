import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { FaChevronRight, FaHandHoldingMedical } from "react-icons/fa";
import { PiCards } from "react-icons/pi";
import { Ri24HoursLine } from "react-icons/ri";
import { BsTruck } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <nav className="flex flex-row justify-between sticky top-0 bg-white p-4">
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
      </nav>
      <section className="bg-background p-3 pt-14">
        <div className="bg-stone-200 font-bold text-amber-800 uppercase inline-block p-3">
          New Arrival...
        </div>
        <h1 className="font-bold text-2xl pt-5 pr-24">
          Elevate Your Home Aesthetics
        </h1>
        <p className="py-4 text-lg">
          A furniture e-commerce company operates in the digital space, offering
          a wide range of furniture products for sale through an online
          platform.
        </p>
        <button className="bg-amber-900/70 p-4 px-8 text-amber-50 uppercase">
          Buy Now <FaChevronRight className="inline" />
        </button>
        <button className="bg-transparent outline p-4 mt-4 uppercase outline-stone-500 text-stone-500">
          View Details <FaChevronRight className="inline" />
        </button>
        <Image
          src={"/chair1.png"}
          height={290}
          width={290}
          alt="An image of a blue couch with wooden legs"
          className="py-24"
        />
      </section>
      <section className="bg-white py-20 p-4">
        <div className="flex flex-row items-center gap-4">
          <BsTruck size={70} />
          <div className="flex flex-col">
            <h3>Free delivery</h3>
            <p>Free shipping on all order</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <PiCards size={70} />
          <div className="flex flex-col">
            <h3>Money Return</h3>
            <p>Back guarantee under 7 days</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Ri24HoursLine size={70} />
          <div className="flex flex-col">
            <h3>Online Support 24/7</h3>
            <p>Support online 24 hours a day</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <FaHandHoldingMedical size={70} />
          <div className="flex flex-col">
            <h3>Reliable</h3>
            <p>Trusted by 1000+ brands</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="bg-sky-100 p-14 ml-4 mb-4 flex flex-col">
          <span className="uppercase text-amber-800">Get 30% off</span>
          <h3 className="font-bold text-3xl py-4">Wicker Hanging Chairs</h3>
          <button className="p-4 bg-amber-900/70 uppercase text-stone-50">
            Buy Now
            <FaChevronRight className="inline" />
          </button>
        </div>
      </section>
    </>
  );
}
