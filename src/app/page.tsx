"use client";

import Button from "@/components/Button";

export default function Page() {
  return (
    <Button
      label="Hey"
      onClick={() => console.log("Jesus is LORD")}
      variant="primary"
    />
  );
}
