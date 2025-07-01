"use client";

import { cva } from "class-variance-authority";
import React, { useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import ArrowButton from "./ArrowButton";
import { Card } from "./ui/card";

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop)
    return (
      <SidebarCard key="1" screenSize="desktop" isDefaultOpen>
        {children}
      </SidebarCard>
    );
  else if (isMobile)
    return (
      <SidebarCard key="2" screenSize="mobile">
        {children}
      </SidebarCard>
    );
  else return null;
};

type SidebarCardProps = {
  screenSize: "desktop" | "mobile";
  isDefaultOpen?: boolean;
  children: React.ReactNode;
};

const SidebarCard = ({
  screenSize,
  isDefaultOpen,
  children,
}: SidebarCardProps) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const arrowDirection = {
    desktop: isOpen ? "left" : "right",
    mobile: isOpen ? "up" : "down",
  }[screenSize];

  return (
    <>
      <Card
        variant="flat"
        className={cn(
          SidebarCardVariants({ position: screenSize, open: isOpen }),
        )}
      >
        <div className="mx-12 my-30 flex w-fit gap-5">{children}</div>
      </Card>

      <div className="flex flex-col items-center">
        <div
          className={cn(
            SidebarArrowVariants({ position: screenSize, open: isOpen }),
          )}
        >
          <div className="w-auto">
            <ArrowButton
              direction={arrowDirection}
              onClick={() => setIsOpen((prev) => !prev)}
              className="transition duration-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarCardVariants = cva(
  "fixed z-10 transition-transform duration-500",
  {
    variants: {
      position: {
        desktop:
          " -translate-x-160 top-0 pr-7 h-full w-[360px] bottom-0 left-0",
        mobile: "-translate-y-160 h-fit right-0 left-0 top-0",
      },
      open: {
        true: "translate-x-0 translate-y-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        position: "desktop",
        open: true,
        class: "translate-x-0",
      },
      {
        position: "mobile",
        open: true,
        class: "translate-y-0",
      },
    ],
  },
);

const SidebarArrowVariants = cva(
  "fixed top-5 z-50 m-4 transition duration-500 flex items-center justify-center",
  {
    variants: {
      position: {
        desktop: "left-0 h-full -translate-x-0",
        mobile: "w-full top-0",
      },
      open: {
        true: "",
        false: "", // base case for defaulting compound logic
      },
    },
    compoundVariants: [
      {
        position: "desktop",
        open: true,
        class: "translate-x-70",
      },
    ],
  },
);
