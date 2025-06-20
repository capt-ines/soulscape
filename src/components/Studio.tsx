"use client";
import millify from "millify";
import React, { useState } from "react";
import { IoAdd, IoLink, IoPersonAddOutline } from "react-icons/io5";
import { PiGridNineFill, PiTag, PiVideo } from "react-icons/pi";
import { NumericFormat } from "react-number-format";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const Studio = () => {
  const [postsValue, setPostsValue] = useState(20);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostsValue(value);
  };

  return (
    <Card className="mx-auto flex max-h-[550px] w-full max-w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:mx-0 sm:max-h-[600px]">
      <Popover>
        <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-lg font-semibold transition duration-200">
          <span>flying23</span>
        </PopoverTrigger>
        <PopoverContent className="w-70">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="posts">@username</Label>
              <Input defaultValue={"flying23"} className="col-span-2 h-8" />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex-2 px-2">
          <Avatar className="h-15 w-15">
            <button className="hover:bg-accent/30 absolute h-15 w-15 rounded-full transition duration-200 hover:cursor-pointer" />
            <AvatarImage src="https://i.pinimg.com/736x/5a/c1/c4/5ac1c483ec407c1b7b4878107fce6c5d.jpg" />
            <AvatarFallback>
              <div className="bg-card flex h-15 w-15 items-center rounded-full border-2">
                <IoAdd className="w-full" size={"26"} />
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center gap-0">
          <Popover>
            <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-xs font-semibold transition duration-200">
              <span>pilot girl</span>
            </PopoverTrigger>
            <PopoverContent className="w-70">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="posts">Name</Label>
                  <Input
                    defaultValue={"pilot girl"}
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 transition duration-200">
              <div className="flex flex-3 items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold">32</span>
                  <span className="text-xs">Posts</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">233K</span>
                  <span className="text-xs">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">233</span>
                  <span className="text-xs">Following</span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="posts">Posts</Label>
                    <NumericFormat
                      customInput={Input}
                      id="posts"
                      defaultValue="30000"
                      className="col-span-2 h-8"
                      thousandSeparator=","
                      allowNegative={false}
                      allowLeadingZeros={false}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="followers">Followers</Label>
                    <NumericFormat
                      customInput={Input}
                      id="followers"
                      defaultValue="30000"
                      className="col-span-2 h-8"
                      thousandSeparator=","
                      allowNegative={false}
                      allowLeadingZeros={false}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="following">Following</Label>
                    <NumericFormat
                      customInput={Input}
                      id="following"
                      defaultValue="30000"
                      className="col-span-2 h-8"
                      thousandSeparator=","
                      allowNegative={false}
                      allowLeadingZeros={false}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Popover>
        <PopoverTrigger className="hover:bg-accent flex cursor-pointer flex-col rounded-md px-2 py-1 text-left transition duration-200">
          <span className="text-muted-foreground">Pilot</span>
          <span>23 📍PL web dev / flying</span>
          <div className="flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400">
            <IoLink className="rotate-45" />
            <span>link.li/nk</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-70">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="posts">Type</Label>
                <Input className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="followers">Description</Label>
                <Textarea className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="following">Links</Label>
                <Input className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex w-full justify-between gap-1 px-2">
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
      <div className="flex gap-3 p-2 text-xs">
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
