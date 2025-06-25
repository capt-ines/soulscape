"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCompassOutline, IoHeartOutline } from "react-icons/io5";

import { useUserStore } from "@/store/userStore";

import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "../../constants/navigation";
import DropdownUserMenu from "../DropdownUserMenu";

const Navbar = () => {
  const user = useUserStore((s) => s.user);
  const pathname = usePathname();
  const navLinks = publicNavLinksData;
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav>
      {!isDashboard ? (
        <ul className={`mx-auto flex w-full gap-8`}>
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={`hover:text-primary transition duration-400 hover:scale-105 ${pathname.includes(link.href) ? `text-white` : ``} `}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      ) : null}
      {user ? (
        <div className="absolute top-9 right-13">
          <div className="flex items-center font-semibold">
            <Link
              aria-label="Saved ideas"
              className="hover:text-primary px-2 transition duration-400 hover:scale-102"
              href="/savedIdeas"
            >
              <IoHeartOutline size={"25"} />
            </Link>
            <Link
              aria-label="Explore"
              className="hover:text-primary px-2 transition duration-400 hover:scale-102"
              href="/explore"
            >
              <IoCompassOutline size={"25"} />
            </Link>
            <DropdownUserMenu />
          </div>
        </div>
      ) : (
        <div className="hover:text-primary absolute top-9 right-13 transition duration-400 hover:scale-102">
          <Link href="/signin">Sign in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
