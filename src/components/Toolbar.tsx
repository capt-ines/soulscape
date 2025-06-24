"use client";

import React, { useEffect, useState } from "react";
import { CiRedo, CiUndo } from "react-icons/ci";
import {
  IoExpand,
  IoExpandOutline,
  IoReturnUpBack,
  IoShare,
  IoShareOutline,
} from "react-icons/io5";
import { PiGear, PiPencilSimpleSlash } from "react-icons/pi";
import { RiFunctionAddLine } from "react-icons/ri";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const Toolbar = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <Card className="fixed right-0 bottom-0 left-0 my-auto flex w-full flex-row justify-center gap-1 p-1 sm:static sm:h-[600px] sm:max-w-fit sm:flex-col sm:gap-3">
        <div className="flex gap-1 sm:flex-col">
          <Skeleton className="h-9 w-10" />
          <Skeleton className="h-9 w-10" />
        </div>
        <div className="flex gap-1 sm:flex-col">
          <Skeleton className="h-9 w-10" />
          <Skeleton className="h-9 w-10" />
        </div>
        <div className="flex gap-1 sm:flex-col">
          <Skeleton className="h-9 w-10" />
          <Skeleton className="h-9 w-10" />
        </div>
      </Card>
    );
  } else {
    return (
      <Card
        variant="aero"
        className="fixed right-0 bottom-0 left-0 my-auto flex w-full flex-row justify-center gap-1 p-1 sm:static sm:h-[600px] sm:max-w-fit sm:flex-col sm:gap-3"
      >
        <div className="flex gap-1 sm:flex-col">
          <Button className="" aria-label="undo button" variant={"outline"}>
            <CiUndo />
          </Button>
          <Button aria-label="redo button" variant={"outline"}>
            <CiRedo />
          </Button>
        </div>
        <div className="flex gap-1 sm:flex-col">
          <Button aria-label="add assets button" variant={"outline"}>
            <RiFunctionAddLine />
          </Button>
          <Button
            aria-label="expand view and disable editing button"
            variant={"outline"}
          >
            <IoExpandOutline />
          </Button>
        </div>
        <div className="flex gap-1 sm:flex-col">
          <Button aria-label="share button" variant={"outline"}>
            <IoShareOutline />
          </Button>
          <Button aria-label="settings button" variant={"outline"}>
            <PiGear />
          </Button>
        </div>
      </Card>
    );
  }
};

export default Toolbar;
