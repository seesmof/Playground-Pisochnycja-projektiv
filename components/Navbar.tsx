import { BsMoon, BsSun } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

export interface NavbarProps {
  projectName: string;
  isDarkMode: boolean;
  setIsDarkMode: any;
}

const Navbar = ({ projectName, isDarkMode, setIsDarkMode }: NavbarProps) => {
  return (
    <>
      <div
        className={`flex flex-row p-3 rounded-md items-center justify-between ${
          isDarkMode ? "bg-slate-800" : "bg-inherit shadow-xl shadow-slate-300"
        }`}
      >
        <h2 className="font-bold sm:text-xl">{projectName}</h2>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <BsSun className="text-xl stroke-[0.2]" />
            ) : (
              <BsMoon className="text-xl stroke-[0.3]" />
            )}
          </button>
          <a
            href="https://github.com/seesmof/frontend-mentor-solutions"
            target="_blank"
            title="View Source Code on GitHub"
            className="flex flex-row items-end gap-1"
          >
            <AiFillGithub className="text-2xl" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
