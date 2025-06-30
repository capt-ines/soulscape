"use client";

import clsx from "clsx";
import React from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { IoBookmarkOutline, IoJournalOutline } from "react-icons/io5";
import { PiButterflyLight, PiGear } from "react-icons/pi";
import { TbGrid4X4 } from "react-icons/tb";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const DashboardMenu = ({ setActiveCategory, activeCategory }) => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const radius = 96;

  const itemsData = [
    { key: "all", icon: <TbGrid4X4 size={18} /> },
    { key: "mockups", icon: <BsGrid3X3 size={18} /> },
    { key: "journals", icon: <IoJournalOutline size={18} /> },
    { key: "affirmations", icon: <IoBookmarkOutline size={18} /> },
    { key: "soulscapes", icon: <PiButterflyLight size={20} /> },
    { key: "settings", icon: <PiGear size={20} /> },
  ];

  const itemCount = itemsData.length;

  const items = itemsData.map((item, index) => {
    const angle = isMobile
      ? (Math.PI / (itemCount - 1)) * index
      : isDesktop
        ? -Math.PI / 2 + (Math.PI / (itemCount - 1)) * index
        : 0;
    const x = isMobile
      ? -Math.cos(angle) * radius
      : isDesktop
        ? Math.cos(angle) * radius
        : 0;
    const y = -Math.sin(angle) * radius;

    return (
      <Button
        onClick={() => setActiveCategory(item.key)}
        variant={activeCategory === item.key ? "default" : "droplet"}
        size={"rounded"}
        key={item.key}
        className="absolute flex flex-col items-center justify-center transition-all duration-700 hover:scale-105"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) translate(${x}px, ${-y}px)`,
        }}
      >
        {item.icon}
        {/* <span className="text-[9px] pt-0.5 text-shadow-xs text-foreground/70">
          {item.label}
        </span> */}
      </Button>
    );
  });

  return (
    <div className="relative mx-auto mb-25 flex w-full flex-col items-center sm:mx-0 sm:mb-0 sm:w-fit sm:flex-row">
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
      <ul className="mx-auto w-full sm:w-fit">{items}</ul>
    </div>
  );
};

export default DashboardMenu;
