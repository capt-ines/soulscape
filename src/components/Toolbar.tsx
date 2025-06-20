"use client";

import React from "react";
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

import useMediaQuery from "@/hooks/useMediaQuery";

import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Toolbar = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  if (isDesktop) {
    return (
      <div className="flex justify-center gap-1">
        <Card className="my-auto flex h-fit justify-center gap-6 p-1">
          <div className="flex flex-col gap-1">
            <Button
              aria-label="save and exit button"
              className="bg-primary mb-1"
              variant={"secondary"}
            >
              <IoReturnUpBack />
            </Button>
            <Button aria-label="undo button" variant={"secondary"}>
              <CiUndo />
            </Button>
            <Button aria-label="redo button" variant={"secondary"}>
              <CiRedo />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <Button aria-label="add assets button" variant={"secondary"}>
              <RiFunctionAddLine />
            </Button>
            <Button
              aria-label="expand view and disable editing button"
              variant={"secondary"}
            >
              <IoExpandOutline />
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <Button aria-label="share button" variant={"secondary"}>
              <IoShareOutline />
            </Button>
            <Button aria-label="settings button" variant={"secondary"}>
              <PiGear />
            </Button>
          </div>
        </Card>
        {children}
      </div>
    );
  } else {
    return children;
  }
};

export default Toolbar;
