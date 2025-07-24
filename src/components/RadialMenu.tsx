"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";

import { Button } from "./ui/button";

type RadialMenuProps = {
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
  func?: () => void;
  itemsData: { key: string; icon: React.ReactNode }[];
  directionY: "down" | "up";
  directionX: "left" | "right";
  menuTrigger: React.ReactNode;
  radius: number;
  staysOpen: boolean;
};

const RadialMenu = ({
  setActiveCategory,
  activeCategory,
  func,
  itemsData,
  directionY,
  directionX,
  menuTrigger,
  radius = 96,
  staysOpen,
}: RadialMenuProps) => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [isOpen, setIsOpen] = useState(staysOpen ? true : false);

  const handleClick = () => {
    if (staysOpen) return;
    setIsOpen((prev) => !prev);
  };

  const itemCount = itemsData.length;

  const items = itemsData.map((item, index) => {
    const angle = isMobile
      ? (Math.PI / (itemCount - 1)) * index
      : isDesktop
        ? -Math.PI / 2 + (Math.PI / (itemCount - 1)) * index
        : 0;

    let x =
      (isMobile && directionX === "right" && -Math.cos(angle) * radius) ||
      (isDesktop && directionX === "right" && Math.cos(angle) * radius) ||
      (isMobile && directionX === "left" && -Math.cos(angle) * radius) ||
      (isDesktop && directionX === "left" && -Math.cos(angle) * radius) ||
      0;

    let y =
      (directionY === "up" && Math.sin(angle) * radius) ||
      (directionY === "down" && -Math.sin(angle) * radius) ||
      Math.sin(angle) * radius;

    // Collapse to center when closed
    if (!isOpen) {
      x = 0;
      y = 0;
    }

    return (
      <Button
        onClick={() => {
          setActiveCategory(item.key);
          func?.();
        }}
        variant={activeCategory === item.key ? "default" : "droplet"}
        size="rounded"
        key={item.key}
        className="absolute flex flex-col items-center justify-center transition-all duration-700 hover:scale-105"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${x}px, ${-y}px)`,
        }}
      >
        {item.icon}
      </Button>
    );
  });

  return (
    <div className="relative mx-auto mb-25 flex w-full flex-col items-center sm:mx-0 sm:mb-0 sm:w-fit sm:flex-row">
      <div className="z-50" onClick={handleClick}>
        {menuTrigger}
      </div>
      <ul className="mx-auto w-full sm:w-fit">{items}</ul>
    </div>
  );
};

export default RadialMenu;
