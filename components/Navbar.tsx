import { BsMoon, BsSun } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { Card } from "./ui/card";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export interface NavbarProps {
  projectName: string;
}

const Navbar = ({ projectName }: NavbarProps) => {
  return (
    <>
      <Card className="flex flex-row p-3 rounded-md items-center justify-between">
        <h2 className="font-bold sm:text-xl">{projectName}</h2>
        <div className="flex flex-row items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/seesmof/code-doodles">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Navbar;
