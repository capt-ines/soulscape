"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { toast } from "sonner";
import useSWR from "swr";

import DashboardCard from "@/components/DashboardCard";
import { DashboardCardContent } from "@/components/DashboardCardContent";
import { deleteMockup } from "@/components/mockup-studio/deleteMockup";
import MockupSettingsDropdownMenu from "@/components/MockupSettingsDropdownMenu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import { MockupData } from "@/types/MockupType";

const Mockups = () => {
  const { data, mutate, isLoading } = useSWR("/api/userData", fetcher);

  const handleDeleteMockup = async (mockup: MockupData) => {
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
      <motion.span
        // key={activeCategory}
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{
          opacity: 3,
          filter: "blur(0px)",
          transition: { duration: 0.3 },
        }}
        className="mx-2 mt-2 mb-3 font-serif text-xl"
      >
        mockups
      </motion.span>
      <ul>
        {data?.mockups.map((mockup: MockupData) => (
          <motion.li key={mockup.id}>
            <div className="hover:bg-background/10 flex cursor-pointer items-center justify-between rounded-lg p-2 transition duration-300">
              <Link
                href={`/dashboard/mockup-studio/${mockup.id}`}
                className="flex w-full items-center justify-start gap-3"
              >
                <Avatar className="droplet h-13 w-13 rounded-full">
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
        ))}
      </ul>
    </motion.div>
  );
};

export default Mockups;
