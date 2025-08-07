"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { soulscapesMenuItems } from "@/constants/soulscapesMenuItems";
import { MockupData } from "@/types/MockupType";

import RadialMenu from "../RadialMenu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const AddFragmentButton = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveCategory("");
      }, 200);
    }
  }, [isOpen]);

  const mockups = userData.mockups.map((mockup: MockupData) => (
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
      </div>
    </motion.li>
  ));

  const renderDialogContent = () => {
    switch (activeCategory) {
      case "mockups":
        return (
          <motion.div
            key="mockups"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.3 },
            }}
          >
            <DialogHeader>
              <DialogTitle>upload from mockups</DialogTitle>
              <DialogDescription>
                upload a mockup to display it in your soulscape
              </DialogDescription>
            </DialogHeader>
            <ul className="flex max-h-80 flex-col overflow-auto">
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
              opacity: 1,
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
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.3 },
            }}
          >
            <p className="mx-2 mt-2">Affirmations go here</p>
          </motion.div>
        );

      case "upload":
        return (
          <motion.div
            key="soulscapes"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.3 },
            }}
          >
            <p className="mx-2 mt-2">Soulscapes go here</p>
          </motion.div>
        );

      case "saved":
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.3 },
            }}
          ></motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.3 },
            }}
          >
            <p className="mx-2 mt-2">All</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="fixed right-0 -bottom-18 left-0 z-13 my-auto flex flex-row justify-center gap-1 p-1">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>{renderDialogContent()}</DialogContent>
      </Dialog>

      <RadialMenu
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        func={() => setIsOpen(true)}
        itemsData={soulscapesMenuItems}
        directionX="right"
        directionY="up"
        radius={80}
        staysOpen={false}
        menuTrigger={
          <Button
            aria-label="add fragment button"
            variant={"droplet"}
            size={"rounded"}
          >
            <IoAdd />
          </Button>
        }
      />
    </div>
  );
};

export default AddFragmentButton;
