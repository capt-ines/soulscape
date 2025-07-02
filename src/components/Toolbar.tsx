"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiRedo, CiSaveDown1, CiUndo } from "react-icons/ci";
import {
  IoExpand,
  IoExpandOutline,
  IoReturnUpBack,
  IoSave,
  IoSaveSharp,
  IoShare,
  IoShareOutline,
} from "react-icons/io5";
import { PiGear, PiPencilSimpleSlash } from "react-icons/pi";
import { RiFunctionAddLine } from "react-icons/ri";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Mockup } from "@/types/Mockups";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const Toolbar = ({ save }: { save: () => Promise<void> }) => {
  return (
    <Card
      variant="droplet"
      className="fixed right-0 bottom-0 left-0 z-13 my-auto flex flex-row justify-center gap-1 p-1 sm:static sm:h-[600px] sm:max-w-fit sm:flex-col sm:gap-3"
    >
      <div className="flex gap-1 sm:flex-col">
        <Button className="" aria-label="undo button" variant={"droplet"}>
          <CiUndo />
        </Button>
        <Button aria-label="redo button" variant={"droplet"}>
          <CiRedo />
        </Button>
      </div>
      <div className="flex gap-1 sm:flex-col">
        <Button aria-label="add assets button" variant={"droplet"}>
          <RiFunctionAddLine />
        </Button>
        <Button
          aria-label="expand view and disable editing button"
          variant={"droplet"}
        >
          <IoExpandOutline />
        </Button>
      </div>
      <div className="flex gap-1 sm:flex-col">
        <Button aria-label="share button" variant={"droplet"}>
          <IoShareOutline />
        </Button>
        <Button onClick={save} aria-label="save button" variant={"default"}>
          <IoSaveSharp />
        </Button>
      </div>
    </Card>
  );
};

export default Toolbar;
