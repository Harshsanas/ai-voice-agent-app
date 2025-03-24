import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

export default function AppHeader() {
  return (
    <div className="p-3 flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={200} height={200} />
      <UserButton />
    </div>
  );
}
