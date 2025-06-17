// import Logo from "../../../public/logospiral";
"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSpiralFill } from "react-icons/pi";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
// import { useUser } from "@/contexts/userContext";
// import { useThemeContext } from "@/contexts/themeContext";
// import { themesData } from "@/constants/themes";

const Header = () => {
  //   const { user } = useUser();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pathname = usePathname();
  const isIndex = pathname === "/";
  // const isDashboard = pathname.startsWith("/dashboard");
  //   const { theme } = useThemeContext();
  //   const darkThemes = themesData.filter((theme) => theme.type === "dark");
  //   useEffect(() => {
  //     if (darkThemes.some((darkTheme) => darkTheme.key === theme)) {
  //       setIsDark(true);
  //     } else {
  //       setIsDark(false);
  //     }
  //   }, [theme]);

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
            <h1 translate="no" className={`text-logo hidden md:block`}>
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
