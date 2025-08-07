"use client";

import { User } from "@supabase/supabase-js";
import { Dot } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoLockClosed } from "react-icons/io5";

import ArrowButton from "@/components/ArrowButton";
import AddFragmentButton from "@/components/soulscapes/AddFragmentButton";
import { Card } from "@/components/ui/card";
import { soulscapeSettingsData } from "@/constants/soulscapeSettingsData";
import { MockupData } from "@/types/MockupType";
import { SoulscapeType } from "@/types/SoulscapeType";

import SortableGrid from "./SortableGrid";
import SoulscapeSettingsDropdownMenu from "./SoulscapeSettingsDropdownMenu";

export const Soulscape = ({
  userData,
  user,
  soulscapeData,
}: {
  userData: { mockups: MockupData[] };
  user: User;
  soulscapeData?: SoulscapeType;
}) => {
  const [soulscape, setSoulscape] = useState<SoulscapeType>(
    soulscapeData ?? { name: "New soulscape", fragments: [], description: "" },
  );

  const soulscapeFragments = soulscapeData
    ? soulscape.fragments.map((fragment, index) => ({
        id: index,
        ...fragment,
      }))
    : [];

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="flex items-center justify-start">
          <Link className="-ml-4 flex items-center p-4" href={"/dashboard/"}>
            <ArrowButton direction="left" />
          </Link>
          <div className="flex w-full justify-between">
            <div>
              <h1 className="font-serif text-xl">{soulscape.name}</h1>
              <span className="text-muted-foreground">
                {soulscape.description}
              </span>
            </div>
            <SoulscapeSettingsDropdownMenu
              soulscape={soulscape}
              handleDelete={() => {}}
            />
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
      {soulscapeFragments.length === 0 && (
        <span className="text-muted-foreground italic">
          There are no fragments yet...
        </span>
      )}
      <SortableGrid items={soulscapeFragments} />
      <AddFragmentButton userData={userData} />
    </div>
  );
};
