import React from "react";
import { Button } from "./button";
import Image from "next/image";
import Logo from "../../../public/logospiral";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";

const Header = () => {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="w-full pt-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="m-2 flex items-center gap-1">
            <h1 className="text-white">soulscape</h1>
            <Logo className="text-white" />
          </div>
        </Link>
        {isDesktop ? <Navbar /> : <HamburgerMenu />}

        {/* <Button onClick={toggleTheme} /> */}
      </div>
    </div>
  );
};

export default Header;
