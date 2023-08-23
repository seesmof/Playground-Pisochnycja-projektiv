import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CardProps {
  link: string;
  name: string;
}

const Card = ({ link, name }: CardProps) => {
  const overlayItemsClasses =
    "group-hover:opacity-100 sm:opacity-0 duration-300";
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <>
      <Link
        href={link}
        className="flex relative flex-col rounded-md overflow-hidden group"
      >
        <div className="relative">
          {imageLoaded ? (
            <Image
              src={`/img${link}.png`}
              className="h-60 w-full object-cover object-top duration-1000 group-hover:object-bottom"
              alt="image of the project"
              width={1000}
              height={1000}
              onError={() => setImageLoaded(false)}
            />
          ) : (
            <Skeleton className="w-full h-60 inset-0" />
          )}
        </div>
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4 group-hover:bg-opacity-50 sm:bg-opacity-0 bg-opacity-50 gap-1 duration-300">
          <h1
            className={`${overlayItemsClasses} text-white text-xl sm:text-2xl font-bold`}
          >
            {name}
          </h1>
          <p
            className={`${overlayItemsClasses} text-white/80 flex flex-row items-center`}
          >
            Preview <GoLinkExternal className="ml-2" />
          </p>
        </div>
      </Link>
    </>
  );
};

export default Card;
