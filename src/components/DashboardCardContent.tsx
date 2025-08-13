"use client";

import { User } from "@supabase/supabase-js";
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
import LoadingLogo from "./LoadingLogo";
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

export const DashboardCardContent = ({
  activeCategory,
}: {
  activeCategory: string;
}) => {
  const { data, mutate, isLoading } = useSWR("/api/userData", fetcher);

  const handleDeleteMockup = async (mockup: Mockup) => {
    const toastId = toast.loading("Deleting in progress...");
    try {
      const { id } = mockup;
      await deleteMockup(mockup);

      mutate(
        (prev) => ({
          ...prev,
          mockups: prev.mockups?.filter((m) => m.id !== id) || [],
        }),
        false,
      );
      toast.success("Mockup deleted successfully.", { id: toastId });
    } catch {
      toast.error("Failed to delete mockup.", { id: toastId });
      await mutate();
    }
  };
  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 1, filter: "blur(0px)" }}
        animate={{
          opacity: 0,
          filter: "blur(2px)",
          transition: { duration: 0.2 },
        }}
        className="py-20"
      >
        <LoadingLogo />;
      </motion.div>
    );
  const mockups = data?.mockups.map((mockup: Mockup) => (
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
          mockup={mockup}
          handleDelete={() => handleDeleteMockup(mockup)}
        />
      </div>
    </motion.li>
  ));

  const journals = data?.journals?.map((jorunal) => (
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
          <Link
            href="/dashboard/soulscapes/new"
            className="hover:bg-background/10 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition duration-300"
          >
            <Button className="h-13 w-13" variant={"droplet"} size={"rounded"}>
              <IoAdd className="text-foreground/80" />
            </Button>
            <span className="text-foreground/80 italic">
              create a new soulscape
            </span>
          </Link>
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
