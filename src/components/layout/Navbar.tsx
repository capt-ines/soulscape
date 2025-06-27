"use client";

import { useState } from "react";

import { HamburgerButton } from "./HamburgerButton";
import { NavItems } from "./NavItems";
import { NavLogo } from "./NavLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between">
      <NavLogo className="w-72" />

      <NavItems className="absolute top-0 right-0 lg:static" isOpen={isOpen} />

      <HamburgerButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={"flex justify-end lg:hidden"}
      />
    </nav>
  );
};

export default Navbar;
