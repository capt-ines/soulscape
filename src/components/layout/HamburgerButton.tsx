"use client";

import { motion } from "framer-motion";
import { ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useUser } from "@/app/providers/UserContextProvider";
import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "@/constants/navigation";
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

export const HamburgerButton = ({ className, isOpen, setIsOpen }) => {
  const initialColor = "var(--foreground)";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
        className={`absolute top-0 right-0 z-50 transition duration-600 md:p-9 ${isOpen ? `opacity-100` : `translate-x-full -translate-y-full opacity-0`}`}
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

    //   <ul
    //     className={`flex flex-col gap-8 text-right text-3xl text-nowrap transition duration-600 ease-in-out ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
    //   >
    //     {user ? (
    //       <li className="text-primary pt-3 transition duration-400 hover:scale-110">
    //         <Link onClick={toggleMenu} href="/dashboard">
    //           {user.email}
    //         </Link>
    //       </li>
    //     ) : (
    //       <li className="text-primary transition duration-400 hover:scale-110">
    //         <Link onClick={toggleMenu} href="/auth/signin">
    //           Sign in
    //         </Link>
    //       </li>
    //     )}
    //     {navLinks}
    //     {user && (
    //       <li className="transition duration-400 hover:scale-110">
    //         <Link href="/dashboard/settings">Settings</Link>
    //       </li>
    //     )}
    //   </ul>
    // </div>
  );
};
