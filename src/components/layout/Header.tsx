"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiSpiralFill } from "react-icons/pi";

import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useUserStore } from "@/store/userStore";

import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div className={clsx("blur-gradient absolute top-0 z-20 h-24 w-full")} />
      <header
        className={clsx(
          "fixed z-[20] flex w-full items-center justify-center px-6 py-3 md:px-13 md:py-9",
        )}
      >
        <Link href={"/"}>
          <div className="group absolute top-5 left-8 my-2 flex items-center gap-0.5 md:top-6.5 md:left-13">
            <h1 translate="no" className={`hidden text-lg md:block`}>
              soulscape
            </h1>
            <PiSpiralFill
              size={20}
              className={`animate-quickspin my-1 scale-130 md:my-0 md:scale-100`}
            />
          </div>
        </Link>
        {hasMounted ? (
          isDesktop ? (
            <Navbar />
          ) : (
            <HamburgerMenu />
          )
        ) : (
          <div className="fixed top-7 right-8 md:top-8 md:right-13">
            <Skeleton className="hidden h-8 w-48 lg:block" />
          </div>
        )}
      </header>
    </>
  );
};
//TODO: pomiedzy logo i hamburgerem bedzie nawigacja po projektach

export default Header;
