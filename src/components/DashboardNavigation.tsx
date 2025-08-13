"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

import { dashboardMenuItems } from "@/constants/dashboardMenuItems";

import RadialMenu from "./RadialMenu";

const DashboardNavigation: React.FC = () => {
  const pathname = usePathname();
  const activeCategory = pathname.includes("all")
    ? "all"
    : pathname.includes("mockups")
      ? "mockups"
      : pathname.includes("journals")
        ? "journals"
        : pathname.includes("soulscapes")
          ? "soulscapes"
          : pathname.includes("affirmations")
            ? "affirmations"
            : pathname.includes("settings")
              ? "settings"
              : "";

  return (
    <>
      {/* <span className="mb-5 text-center sm:hidden">{user?.username}</span>  */}
      <RadialMenu
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
    </>
  );
};

export default DashboardNavigation;
