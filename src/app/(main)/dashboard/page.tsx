"use client";
import clsx from "clsx";
import { BsGrid3X3 } from "react-icons/bs";
import { IoBookmarkOutline, IoJournalOutline } from "react-icons/io5";
import { PiButterflyLight, PiGear } from "react-icons/pi";
import { TbGrid4X4 } from "react-icons/tb";

import { Card } from "@/components/ui/card";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const radius = 96;

  const itemsData = [
    { label: "All", icon: <TbGrid4X4 size={18} /> },
    { label: "Mockups", icon: <BsGrid3X3 size={18} /> },
    { label: "Journal", icon: <IoJournalOutline size={18} /> },
    { label: "Affirmations", icon: <IoBookmarkOutline size={18} /> },
    { label: "Soulscapes", icon: <PiButterflyLight size={20} /> },
    { label: "Settings", icon: <PiGear size={20} /> },
  ];

  const itemCount = itemsData.length;

  const items = itemsData.map((item, index) => {
    const angle = isMobile
      ? (Math.PI / (itemCount - 1)) * index
      : -Math.PI / 2 + (Math.PI / (itemCount - 1)) * index;
    const x = isMobile ? -Math.cos(angle) * radius : Math.cos(angle) * radius;
    const y = -Math.sin(angle) * radius;

    return (
      <li
        key={index}
        className="inset-shadow-glow/50 absolute flex aspect-square w-12 flex-col items-center justify-center rounded-full shadow-2xs inset-shadow-xs backdrop-blur-xl transition duration-700 hover:scale-110"
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
      </li>
    );
  });

  return (
    <section className="mx-4 my-19 flex flex-col justify-between sm:mx-12 sm:my-23 sm:flex-row sm:gap-30">
      <div className="relative mx-auto mb-25 flex w-full flex-col items-center sm:mx-0 sm:mb-0 sm:w-fit sm:flex-row">
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
        <ul className="mx-auto w-full sm:w-fit">{items}</ul>
      </div>
      <Card
        className="w-full"
        style={{
          maxHeight: `calc(100vh - ${isDesktop && "184px"})`,
          minHeight: `calc(100vh - ${isMobile ? "262px" : "184px"})`,
        }}
        variant="aero"
      ></Card>
    </section>
  );
}
