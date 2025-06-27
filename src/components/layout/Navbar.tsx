"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoCompassOutline, IoHeartOutline } from "react-icons/io5";
import { PiSpiralFill } from "react-icons/pi";

import { useUser } from "@/app/providers/UserContextProvider";
import { cn } from "@/lib/utils";

import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "../../constants/navigation";
import DropdownUserMenu from "../DropdownUserMenu";
import { HamburgerButton } from "./HamburgerButton";

const navLinks = publicNavLinksData;

const Navbar = () => {
  const user = useUser();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="grid w-full grid-cols-2 items-center lg:grid-cols-4">
      <NavLogo className="lg:col-span-1" />
      <NavItems
        className="absolute top-0 right-0 lg:static lg:col-span-2"
        isOpen={isOpen}
      />
      <DropdownUserMenu className="col-span-1 hidden p-6 lg:flex lg:justify-end" />
      <HamburgerButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={"flex justify-end lg:hidden"}
      />
    </nav>
  );
};

export const NavItems = ({ isOpen, className }) => {
  const pathname = usePathname();
  return (
    <ul
      className={cn(
        className,
        "z-50 flex w-full flex-col justify-center gap-8 px-10 py-20 text-right text-2xl transition duration-600 md:p-30 md:text-3xl lg:z-auto lg:translate-0 lg:flex-row lg:p-0 lg:text-center lg:text-base",
        isOpen ? "lg:translate-0" : "translate-x-full -translate-y-full",
      )}
    >
      {navLinks.map((link, index) => (
        <div key={index}>
          <li
            key={link.href}
            className={`hover:text-primary transition duration-400 hover:scale-105 ${pathname.includes(link.href) ? `text-white` : ``} `}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        </div>
      ))}
    </ul>
  );
};

export const NavLogo = ({ className }) => {
  return (
    <Link className={(cn(className), "p-6")} href={"/"}>
      <div className="flex items-center gap-0.5">
        <h1 translate="no" className={`hidden text-lg md:block`}>
          soulscape
        </h1>
        <PiSpiralFill
          size={20}
          className={`animate-quickspin my-1 scale-130 md:my-0 md:scale-100`}
        />
      </div>
    </Link>
  );
};

export default Navbar;
