"use client";

import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";
import useSWR from "swr";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dashboardMenuItems } from "@/constants/dashboardMenuItems";
import { fetcher } from "@/lib/fetcher";
import { Mockup } from "@/types/MockupType";

import DashboardCard from "./DashboardCard";
import { DashboardCardContent } from "./DashboardCardContent";
import { deleteMockup } from "./mockup-studio/deleteMockup";
import MockupSettingsDropdownMenu from "./MockupSettingsDropdownMenu";
import RadialMenu from "./RadialMenu";
import { Settings } from "./Settings";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const DashboardPanel = () => {
  const [activeCategory, setActiveCategory] = useState("mockups");
  const { user } = useUser();
  return (
    <section className="mx-4 my-19 flex flex-col justify-between sm:mx-12 sm:my-23 sm:flex-row sm:gap-30">
      <span className="mb-5 text-center sm:hidden">{user?.username}</span>
      <RadialMenu
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        itemsData={dashboardMenuItems}
        directionY={"down"}
        directionX={"right"}
        staysOpen={true}
        menuTrigger={
          <div
            style={{ willChange: "transform" }}
            className={clsx(
              "aspect-square",
              "w-20",
              "blur-xs",
              "mix-blend-plus-lighter",
              "rounded-full",
              "mx-auto",
              "bg-white",
              "transition",
              "duration-1000",
              "ease-out",
              "glow hover:biggerglow",
              "hover:scale-110",
            )}
          />
        }
      />
      <DashboardCard activeCategory={activeCategory}>
        <DashboardCardContent activeCategory={activeCategory} />
      </DashboardCard>
    </section>
  );
};
