"use client";

import { Dot } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoLockClosed } from "react-icons/io5";

import ArrowButton from "@/components/ArrowButton";
import AddFragmentButton from "@/components/soulscapes/AddFragmentButton";
import { Card } from "@/components/ui/card";

export const Soulscape = ({ userData }) => {
  const [soulscape, setSoulscape] = useState();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="flex items-center justify-start">
          <Link className="-ml-4 flex items-center p-4" href={"/dashboard/"}>
            <ArrowButton direction="left" />
          </Link>
          <div className="flex w-full justify-between">
            <h1 className="font-serif text-xl">soulscape</h1>
            <BsThreeDots />
          </div>
        </div>

        <div className="text-muted-foreground flex">
          <span className="flex items-center gap-1 text-xs">
            Private <IoLockClosed />
          </span>
          <Dot className="" />
          <span className="flex items-center gap-1 text-xs">20 fragments</span>
        </div>
      </div>

      <div className="grid grid-flow-col gap-1">
        <Card></Card>
        <Card></Card>
      </div>

      <AddFragmentButton userData={userData} />
    </div>
  );
};
