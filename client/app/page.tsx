"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const containerClasses = "flex flex-row justify-between items-center";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogIn = () => {
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
  };

  if (!isLoggedIn)
    return (
      <div className={containerClasses}>
        <p className="text-red-600 font-medium">Please log in first.</p>
        <Button onClick={handleLogIn}>Log In.</Button>
      </div>
    );
  else
    return (
      <div className={containerClasses}>
        <p className="font-medium text-lg">Welcome!</p>
        <Button variant="outline" onClick={handleLogIn}>
          Log Out.
        </Button>
      </div>
    );
};

export default Page;
