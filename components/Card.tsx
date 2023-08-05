import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";

interface CardProps {
  link: string;
  name: string;
  isDarkMode: boolean;
}

const Card = ({ link, name, isDarkMode }: CardProps) => {
  const overlayItemsClasses =
    "group-hover:opacity-100 sm:opacity-0 duration-300";

  return (
    <>
      <Link
        href={link}
        className={`flex relative flex-col rounded-md overflow-hidden group ${
          isDarkMode ? "" : "shadow-xl shadow-slate-300"
        }`}
      >
        <img
          src={`/img/${link}.png`}
          className="h-60 w-full object-cover object-top duration-[1500ms] group-hover:object-bottom"
          alt=""
        />
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
