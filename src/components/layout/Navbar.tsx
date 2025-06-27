"use client";

import { useState } from "react";

import { UserContextProvider } from "@/app/providers/UserContextProvider";

import { HamburgerButton } from "./HamburgerButton";
import { NavItems } from "./NavItems";
import { NavLogo } from "./NavLogo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex w-full items-center justify-between">
      <NavLogo className="w-fit lg:w-72" />
      <UserContextProvider>
        <NavItems
          className="absolute top-0 right-0 lg:static"
          isOpen={isOpen}
          toggleMenu={toggleMenu}
        />
      </UserContextProvider>
      <HamburgerButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleMenu={toggleMenu}
        className={"flex justify-end lg:hidden"}
      />
    </nav>
  );
};
