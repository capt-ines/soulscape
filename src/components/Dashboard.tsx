"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dashboardMenuItems } from "@/constants/dashboardMenuItems";
import { Mockup } from "@/types/MockupType";

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

export const DashboardPanel = ({ userData, user }) => {
  const [activeCategory, setActiveCategory] = useState("mockups");
  return (
    <>
      <section className="mx-4 my-19 flex flex-col justify-between sm:mx-12 sm:my-23 sm:flex-row sm:gap-30">
        <span className="mb-5 text-center sm:hidden">{user?.email}</span>
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
                "z-10",
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
        <motion.div
          animate={{
            backdropFilter: "blur(64px)",
            opacity: 1,
            transition: { duration: 2 },
          }}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="min-h-[calc(100vh-262px)] w-full justify-start gap-0 rounded-xl px-2 py-3 sm:h-[calc(100vh-184px)] sm:overflow-y-auto sm:p-4"
        >
          <motion.span
            key={activeCategory}
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{
              opacity: 3,
              filter: "blur(0px)",
              transition: { duration: 0.3 },
            }}
            className="mx-2 mt-2 mb-3 font-serif text-xl"
          >
            {activeCategory}
          </motion.span>
          <AnimatePresence>
            <DashboardContent
              userData={userData}
              activeCategory={activeCategory}
            />
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
};

const DashboardContent = ({ userData, activeCategory }) => {
  const [mockupsData, setMockupsData] = useState(userData.mockups);

  const mockups = mockupsData.map((mockup: Mockup) => (
    <motion.li key={mockup.id}>
      <div className="hover:bg-background/10 flex cursor-pointer items-center justify-between rounded-lg p-2 transition duration-300">
        <Link
          href={`/dashboard/mockup-studio/${mockup.id}`}
          className="flex w-full items-center justify-start gap-3"
        >
          <Avatar className="droplet h-13 w-13">
            <AvatarImage src={mockup.avatar || ""} />
          </Avatar>
          <span className="font-semibold">{`@${mockup.username}`}</span>
        </Link>
        <MockupSettingsDropdownMenu
          id={mockup.id}
          setMockupsData={setMockupsData}
          mockup={mockup}
        />
      </div>
    </motion.li>
  ));

  const journals = userData.journals?.map((jorunal) => (
    <li
      key={jorunal.id}
      className="hover:bg-background/10 flex cursor-pointer items-center justify-start gap-3 rounded-lg p-2 transition duration-300"
    >
      <span className="font-semibold">{`@${jorunal.title}`}</span>
    </li>
  ));

  switch (activeCategory) {
    case "mockups":
      return (
        <motion.div
          key="mockups"
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{
            opacity: 3,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
        >
          <Link
            href="/dashboard/mockup-studio/new"
            className="hover:bg-background/10 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition duration-300"
          >
            <Button className="h-13 w-13" variant={"droplet"} size={"rounded"}>
              <IoAdd className="text-foreground/80" />
            </Button>
            <span className="text-foreground/80 italic">
              create a new mockup
            </span>
          </Link>
          <ul className="flex flex-col">
            <AnimatePresence>{mockups}</AnimatePresence>
          </ul>
        </motion.div>
      );

    case "journals":
      return (
        <motion.div
          key="journals"
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{
            opacity: 3,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
        >
          <div className="hover:bg-background/10 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition duration-300">
            <Button variant={"droplet"} size={"rounded"}>
              <IoAdd className="text-foreground/80" />
            </Button>
            <span className="text-foreground/80 italic">
              write a new journal
            </span>
          </div>
          <ul className="flex flex-col">{journals}</ul>
        </motion.div>
      );

    case "affirmations":
      return (
        <motion.div
          key="affirmations"
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{
            opacity: 3,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
        >
          <p className="mx-2 mt-2">Affirmations go here</p>
        </motion.div>
      );

    case "soulscapes":
      return (
        <motion.div
          key="soulscapes"
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{
            opacity: 3,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
        >
          <p className="mx-2 mt-2">Soulscapes go here</p>
        </motion.div>
      );

    case "settings":
      return (
        <motion.div
          key="affirmations"
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{
            opacity: 3,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
        >
          <Settings />
        </motion.div>
      );

    default:
      return (
        <motion.div
          key="all"
          initial={{ opacity: 0, filter: "blur(2px)" }}
          animate={{
            opacity: 3,
            filter: "blur(0px)",
            transition: { duration: 0.3 },
          }}
        >
          <p className="mx-2 mt-2">All</p>
        </motion.div>
      );
  }
};
