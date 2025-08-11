"use client";

import { toPng } from "html-to-image";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiRedo, CiSaveDown1, CiUndo } from "react-icons/ci";
import {
  IoDownload,
  IoDownloadOutline,
  IoExpand,
  IoExpandOutline,
  IoLinkOutline,
  IoReturnUpBack,
  IoSave,
  IoSaveSharp,
  IoShare,
  IoShareOutline,
} from "react-icons/io5";
import {
  PiButterfly,
  PiDownload,
  PiGear,
  PiImage,
  PiPencilSimple,
  PiPencilSimpleSlash,
} from "react-icons/pi";
import { RiFunctionAddLine } from "react-icons/ri";
import { toast } from "sonner";

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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import type { Mockup } from "@/types/MockupType";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Toaster } from "./ui/sonner";

const Toolbar = ({
  canUndo,
  canRedo,
  undo,
  redo,
  save,
  setIsPreview,
  isPreview,
  downloadComponentAsImage,
}: {
  canUndo: boolean;
  downloadComponentAsImage: (
    ref: React.RefObject<HTMLDivElement | null>,
  ) => void;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  save: () => Promise<void>;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  isPreview: boolean;
  mockupRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const shareToast = () => {
    const toastId = toast.info(
      "Set your mockup as public to enable this option.",
    );
  };
  return (
    <Card
      variant="droplet"
      className="fixed right-0 bottom-0 left-0 z-13 my-auto flex flex-row justify-center gap-1 p-1 sm:static sm:h-[600px] sm:max-w-fit sm:flex-col sm:gap-3"
    >
      <div className="flex gap-1 sm:flex-col">
        <Button
          disabled={isPreview || !canUndo ? true : false}
          onClick={undo}
          aria-label="undo button"
          variant={"droplet"}
        >
          <CiUndo />
        </Button>
        <Button
          disabled={isPreview || !canRedo ? true : false}
          onClick={redo}
          aria-label="redo button"
          variant={"droplet"}
        >
          <CiRedo />
        </Button>
      </div>
      <div className="flex gap-1 sm:flex-col">
        <Button aria-label="add assets button" variant={"droplet"}>
          <RiFunctionAddLine />
        </Button>
        <Button
          onClick={() => setIsPreview((prev) => !prev)}
          aria-label="edit mode toggle button"
          variant="droplet"
        >
          {isPreview ? <PiPencilSimpleSlash /> : <PiPencilSimple />}
        </Button>
      </div>
      <div className="flex gap-1 sm:flex-col">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="flex cursor-pointer items-center justify-center"
            >
              <Button aria-label="share button" variant={"droplet"}>
                <IoShareOutline />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent variant="droplet" align="center">
              <DropdownMenuLabel className="font-semibold">
                Share mockup
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div onClick={() => shareToast()}>
                <DropdownMenuItem disabled className="cursor-pointer">
                  <IoLinkOutline />
                  Share link
                </DropdownMenuItem>
              </div>

              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  <PiButterfly />
                  Add to soulscape
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem
                onClick={downloadComponentAsImage}
                className="cursor-pointer"
              >
                <IoDownloadOutline />
                Save & download as image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to soulscape</DialogTitle>
              <DialogDescription className="text-sm">
                Choose a soulscape.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button">Add</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button onClick={save} aria-label="save button" variant={"default"}>
          <IoSaveSharp />
        </Button>
      </div>
    </Card>
  );
};

export default Toolbar;
