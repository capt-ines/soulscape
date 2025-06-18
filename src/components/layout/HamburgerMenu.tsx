import { motion } from "framer-motion";
import { ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "@/constants/navigation";

type DotTypes = { isOpen: boolean; isBig?: boolean; initialColor: string };

const Dot = ({ initialColor, isOpen, isBig = false }: DotTypes) => (
  <motion.div
    {...(isOpen && { animate: { backgroundColor: "var(--background)" } })}
    transition={{ duration: 0.05 }}
    initial={{ backgroundColor: initialColor }}
    className={`h-1 w-1 transform rounded-full transition duration-800 ease-in-out ${
      isBig
        ? isOpen
          ? `scale-[70000%]`
          : `scale-[100%] group-hover:scale-[120%]`
        : isOpen
          ? `scale-[900%]`
          : `scale-[100%] group-hover:scale-[120%]`
    }`}
  />
);

const HamburgerMenu = () => {
  const user = false;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const initialColor = "var(--foreground)";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinks =
    pathname === "/" || !user
      ? dashboardNavLinksData.map((link) => (
          <li
            key={link.href}
            className="transition duration-400 hover:scale-110"
          >
            <Link onClick={toggleMenu} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))
      : publicNavLinksData.map((link) => (
          <li
            key={link.href}
            className="transition duration-400 hover:scale-110"
          >
            <Link onClick={toggleMenu} href={link.href}>
              {link.label}
            </Link>
          </li>
        ));

  return (
    <nav className="fixed top-7 right-8 z-50 md:top-6.5 md:right-13">
      <button
        aria-label="Toggle menu"
        onClick={toggleMenu}
        className="group -my-4.5 -mr-6 flex cursor-pointer flex-col items-center gap-1 p-6"
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
      <div
        className={`absolute top-10 right-2 z-52 flex flex-col items-end gap-3 text-right transition duration-600 ease-in-out min-[580px]:right-10 min-[580px]:gap-4 min-[580px]:text-2xl md:right-8 ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
      >
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="cursor-pointer pb-3 pl-2"
        >
          <ChevronUpIcon className="size-12 translate-x-4 rotate-45" />
        </button>
        <ul
          className={`flex flex-col gap-8 text-right text-3xl text-nowrap transition duration-600 ease-in-out min-[580px]:right-40 min-[580px]:gap-10 min-[580px]:text-4xl ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
        >
          {user ? (
            <li className="text-primary pt-3 pb-3 transition duration-400 hover:scale-110">
              <Link onClick={toggleMenu} href="/dashboard">
                username
              </Link>
            </li>
          ) : (
            <li className="text-primary transition duration-400 hover:scale-110">
              <Link onClick={toggleMenu} href="/login">
                Sign in
              </Link>
            </li>
          )}
          {navLinks}
          {user && (
            <li className="transition duration-400 hover:scale-110">
              <Link href="/dashboard/settings">Settings</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default HamburgerMenu;
