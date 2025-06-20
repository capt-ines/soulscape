"use client";

import clsx from "clsx";
import React from "react";
import {} from "react-icons/io5";
import { PiGear, PiPencilSimpleSlash } from "react-icons/pi";
import { RiFunctionAddLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import useMediaQuery from "@/hooks/useMediaQuery";

const BottomToolbar = () => {
  const isMobile = useMediaQuery("(max-width: 639px)");
  if (isMobile) {
    return (
      <>
        <div
          className={clsx(
            "blur-gradient-top absolute bottom-0 z-20 -mx-3 h-24 w-full",
          )}
        />
        <div
          className={clsx(
            "fixed z-[20] flex w-full items-center justify-center px-6 py-3 md:px-13 md:py-9",
          )}
        >
          <div className="group absolute top-5 left-8 my-2 flex items-center gap-0.5">
            <Toggle aria-label="disable edit mode button">
              <PiPencilSimpleSlash />
            </Toggle>
            <Button aria-label="settings button" variant="ghost">
              <PiGear />
            </Button>
            <Button aria-label="add images button" variant="ghost">
              <RiFunctionAddLine />
            </Button>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default BottomToolbar;
