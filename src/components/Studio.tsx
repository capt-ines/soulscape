import React from "react";
import { IoAdd, IoLink, IoPersonAddOutline } from "react-icons/io5";
import { PiGridNineFill, PiTag, PiVideo } from "react-icons/pi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import TextArea from "./TextArea";

const Studio = () => {
  return (
    <Card className="mx-auto flex max-h-[550px] w-full max-w-[295px] flex-col gap-2 overflow-auto p-4 text-sm sm:mx-0 sm:max-h-[600px]">
      <div className="w-full">
        <input
          defaultValue={"flying23"}
          className="focus:bg-muted/40 -mb-0.5 -ml-1 px-1 py-0.5 text-lg font-semibold transition duration-200 focus:rounded-sm focus:outline-0"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex-2">
          <Avatar className="h-15 w-15">
            <button className="hover:bg-foreground/10 absolute h-15 w-15 rounded-full transition duration-200 hover:cursor-pointer" />
            <AvatarImage src="https://i.pinimg.com/736x/5a/c1/c4/5ac1c483ec407c1b7b4878107fce6c5d.jpg" />
            <AvatarFallback>
              <div className="bg-card flex h-15 w-15 items-center rounded-full border-2">
                <IoAdd className="w-full" size={"26"} />
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center gap-0">
          <input
            defaultValue="pilot girl"
            maxLength={20}
            className="focus:bg-muted/40 -mb-0.5 -ml-1 px-1 py-0.5 text-xs font-semibold transition duration-200 focus:rounded-sm focus:outline-0"
          />
          <div className="flex flex-3 items-center justify-between gap-4">
            <div className="flex flex-col">
              <input
                defaultValue={"32"}
                className="focus:bg-muted/40 -mb-0.5 -ml-1 px-1 py-0.5 font-semibold transition duration-200 focus:rounded-sm focus:outline-0"
              />
              <span className="text-xs">Posts</span>
            </div>
            <div className="flex flex-col">
              <input
                defaultValue={"23K"}
                className="focus:bg-muted/40 -mb-0.5 -ml-1 px-1 py-0.5 font-semibold transition duration-200 focus:rounded-sm focus:outline-0"
              />
              <span className="text-xs">Followers</span>
            </div>
            <div className="flex flex-col">
              <input
                defaultValue={"1K"}
                className="focus:bg-muted/40 -mb-0.5 -ml-1 px-1 py-0.5 font-semibold transition duration-200 focus:rounded-sm focus:outline-0"
              />
              <span className="text-xs">Following</span>
            </div>
          </div>
        </div>
      </div>
      <div className="-mx-1 flex flex-col">
        <input
          defaultValue={"Pilot"}
          className="focus:bg-muted/40 text-muted-foreground -my-0.5 flex items-center gap-1 px-1 py-0.5 transition duration-200 focus:rounded-sm focus:outline-0"
        />
        <TextArea defaultValue={"23 📍PL\nweb dev / flying"} maxLength={200} />
        {/* <span className="font-semibold text-indigo-600">#LoremIpsum</span> */}
        <div className="-mb-0.5 ml-1 flex items-center text-indigo-500 dark:text-indigo-400">
          <IoLink className="rotate-45" />
          <input
            defaultValue={"link.li/nk"}
            className="focus:bg-muted/40 flex items-center gap-1 px-1 py-0.5 font-semibold transition duration-200 focus:rounded-sm focus:outline-0"
          />
        </div>
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
      <div className="mb-1 flex gap-3 text-xs">
        <div className="flex flex-col items-center gap-1">
          <button className="button border-seconadry flex aspect-square w-10 items-center rounded-full border-2">
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

      <div className="-mx-3.5">
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
          <div className="bg-accent min-h-25 min-w-20" />
          <div className="bg-accent min-h-25 min-w-20" />
          <div className="bg-accent min-h-25 min-w-20" />
          <div className="bg-accent min-h-25 min-w-20" />
          <div className="bg-accent min-h-25 min-w-20" />
        </div>
      </div>
    </Card>
  );
};

export default Studio;
