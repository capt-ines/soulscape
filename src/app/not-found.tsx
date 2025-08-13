import Link from "next/link";
import React from "react";

import ArrowButton from "@/components/ArrowButton";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-1">
      <h1 className="text-6xl">404</h1>
      <h2>page not found!</h2>
      <Link
        href="/"
        className="text-muted-foreground flex cursor-pointer items-center gap-2 transition duration-300 hover:scale-105"
      >
        <ArrowButton direction="left" />
        <span>take me back</span>
      </Link>
    </div>
  );
};

export default NotFound;
