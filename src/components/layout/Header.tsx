"use client";

import clsx from "clsx";
import Link from "next/link";
import { PiSpiralFill } from "react-icons/pi";

import useMediaQuery from "@/hooks/useMediaQuery";

import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <div
        className={clsx("blur-gradient absolute top-0 z-20 h-24 w-full")}
      ></div>
      <header
        className={clsx(
          "fixed z-[20] flex w-full items-center justify-center px-6 py-3 md:px-13 md:py-9",
        )}
      >
        <Link href={"/"}>
          <div className="group absolute top-5 left-8 my-2 flex items-center gap-0.5 md:top-6.5 md:left-13">
            <h1 translate="no" className={`hidden md:block`}>
              soulscape
            </h1>
            <PiSpiralFill
              size={20}
              className={`animate-quickspin my-1 scale-130 md:my-0 md:scale-100`}
            />
          </div>
        </Link>
        {isDesktop ? <Navbar /> : <HamburgerMenu />}
      </header>
    </>
  );
};

export default Header;
