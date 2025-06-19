import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  IoAdd,
  IoLink,
  IoPerson,
  IoPersonAdd,
  IoPersonAddOutline,
  IoPersonSharp,
  IoTabletLandscape,
  IoVideocam,
} from "react-icons/io5";
import { PiGridNine, PiGridNineFill, PiTag, PiVideo } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MockupStudio = () => {
  return (
    <div>
      <Card className="flex w-full max-w-96 flex-col gap-4 p-5 text-sm">
        <div className="w-full text-center">
          <p className="text-lg font-semibold">username</p>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="bg-primary aspect-square w-15 rounded-full" />
          <div className="flex items-center justify-between gap-5">
            <div className="flex flex-col items-center">
              <span className="font-bold">32</span>
              <span className="text-xs">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">322k</span>
              <span className="text-xs">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">32</span>
              <span className="text-xs">Following</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">User Name</span>
          <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit</span>
          <span className="font-semibold text-indigo-600">#LoremIpsum</span>
          <span className="flex items-center gap-1 font-semibold text-indigo-600">
            <IoLink className="rotate-45" />
            link.li/nk
          </span>
        </div>
        <div className="flex w-full justify-between gap-1">
          <Button variant={"secondary"} className="flex-1 font-bold">
            Edit
          </Button>
          <Button variant={"secondary"} className="flex-1 font-bold">
            Share profile
          </Button>
          <Button variant={"secondary"}>
            <IoPersonAddOutline />
          </Button>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex flex-col items-center gap-1">
            <button className="border-seconadry flex aspect-square w-10 items-center rounded-full border-2">
              <IoAdd className="w-full" size={"21"} />
            </button>

            <span>New</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-primary aspect-square w-10 rounded-full" />
            <span>Title</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-primary aspect-square w-10 rounded-full" />
            <span>Title</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-primary aspect-square w-10 rounded-full" />
            <span>Title</span>
          </div>
        </div>

        <div>
          <div className="mb-0.5 flex min-h-6 justify-around">
            <div className="border-foreground flex w-12 items-center justify-center border-b-2">
              <PiGridNineFill size={"23"} className="mb-1 rotate-90" />
            </div>
            <div className="flex w-12 items-center justify-center border-b-2 border-transparent">
              <PiVideo size={"23"} className="mb-1" />
            </div>
            <div className="flex w-12 items-center justify-center border-b-2 border-transparent">
              <PiTag size={"23"} className="mb-1 -rotate-45" />
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-0.5">
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MockupStudio;
