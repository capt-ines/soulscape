"use client";

import { motion } from "framer-motion";
import { ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type DotTypes = { isOpen: boolean; isBig?: boolean; initialColor: string };

const Dot = ({ initialColor, isOpen, isBig = false }: DotTypes) => (
  <motion.div
    {...(isOpen && { animate: { backgroundColor: "var(--background)" } })}
    transition={{ duration: 0.05 }}
    initial={{ backgroundColor: initialColor }}
    className={`h-1 w-1 transform rounded-full transition duration-800 ease-in-out ${
      isOpen
        ? isBig
          ? "z-40 scale-[70500%] md:scale-[74000%]"
          : "scale-[900%]"
        : "scale-[100%] group-hover:scale-[120%]"
    }`}
  />
);

export const HamburgerButton = ({
  className,
  isOpen,
  setIsOpen,
  toggleMenu,
}: {
  className: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const initialColor = "var(--foreground)";

  return (
    <>
      <div className={cn(className)}>
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className={cn("flex cursor-pointer flex-col items-center gap-1 p-6")}
        >
          <div className="flex gap-1">
            <Dot isOpen={isOpen} initialColor={initialColor} />
            <Dot isOpen={isOpen} initialColor={initialColor} />
            <Dot isOpen={isOpen} initialColor={initialColor} />
          </div>
          <div className="flex gap-1">
            <Dot isOpen={isOpen} initialColor={initialColor} />
            <Dot isOpen={isOpen} initialColor={initialColor} isBig={true} />
            <Dot isOpen={isOpen} initialColor={initialColor} />
          </div>
          <div className="flex gap-1">
            <Dot isOpen={isOpen} initialColor={initialColor} />
            <Dot isOpen={isOpen} initialColor={initialColor} />
            <Dot isOpen={isOpen} initialColor={initialColor} />
          </div>
        </button>
      </div>

      <div
        className={`absolute top-0 right-0 z-50 transition duration-600 md:p-9 lg:hidden ${
          isOpen
            ? `opacity-100`
            : `translate-x-full -translate-y-full opacity-0`
        }`}
      >
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="cursor-pointer p-6"
        >
          <ChevronUpIcon className="size-12 rotate-45" />
        </button>
      </div>
    </>
  );
};
