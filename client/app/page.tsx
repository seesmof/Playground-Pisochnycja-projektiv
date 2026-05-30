"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn)
    return (
      <div className="flex flex-row justify-between">
        <p className="text-red-600 font-medium">Please log in first.</p>
        <Button onClick={() => (isLoggedIn: boolean) => !isLoggedIn}>
          Log In.
        </Button>
      </div>
    );
  else return <p className="font-medium text-lg">Welcome!</p>;
};

export default Page;
