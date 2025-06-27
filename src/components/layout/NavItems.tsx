"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useUser } from "@/app/providers/UserContextProvider";
import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";

import { NavUserItem } from "../DropdownUserMenu";
import { Separator } from "../ui/separator";

export const NavItems = ({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className: string;
}) => {
  const pathname = usePathname();
  const user = useUser();
  const userNavLink = user
    ? { label: user.email, href: "/dashboard" }
    : { label: "Sign in", href: "/auth/signin" };

  return (
    <ul className="flex w-full items-center justify-between">
      <div
        className={cn(
          className,
          "z-50 flex w-full flex-col justify-center gap-8 px-10 py-25 text-right text-2xl transition-transform duration-600 md:p-30 md:text-3xl lg:z-auto lg:translate-0 lg:flex-row lg:gap-10 lg:p-0 lg:text-center lg:text-sm",
          isOpen ? "lg:translate-0" : "translate-x-full -translate-y-full",
        )}
      >
        <li className="hover:text-primary cursor-pointer transition duration-400 hover:scale-105 lg:hidden">
          <Link href={userNavLink.href}> {userNavLink.label}</Link>
        </li>

        {dashboardNavLinksData.map((link) => (
          <li
            key={link.href}
            className={`hover:text-primary transition duration-400 hover:scale-105 lg:hidden ${pathname.includes(link.href) ? `text-white` : ``} `}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}

        {publicNavLinksData.map((link) => (
          <li
            key={link.href}
            className={`hover:text-primary transition duration-400 hover:scale-105 ${pathname.includes(link.href) ? `text-white` : ``} ${pathname === "/dashboard" ? `hidden` : ``}`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </div>
      <NavUserItem className="w-72 p-6 lg:flex lg:justify-end" />
    </ul>
  );
};
