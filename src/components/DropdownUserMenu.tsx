"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { PiDoorOpen, PiGear } from "react-icons/pi";

import { useUser } from "@/app/providers/UserContextProvider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardNavLinksData as navlinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export const NavUserItem = ({ className }: { className: string }) => {
  const user = useUser();
  return (
    <li className={cn(className, "hidden lg:flex lg:justify-end")}>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-primary flex cursor-pointer items-center gap-2 transition duration-400 hover:scale-102">
            {user?.email} <ChevronDownIcon className="size-5" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            variant="aero"
            align="end"
            className="mx-content min-w-36 justify-end text-right"
          >
            <DropdownMenuItem className="justify-end hover:cursor-pointer">
              <Link className="flex gap-2" href="/dashboard">
                <span>My profile</span>
              </Link>
              <div className="bg-primary border-foreground h-5 w-5 rounded-full border-1"></div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {navlinks.map((link, index) => (
              <DropdownMenuItem
                key={index}
                className="justify-end hover:cursor-pointer"
              >
                <Link className="flex gap-1" href="/dashboard">
                  <span>{link.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="justify-end hover:cursor-pointer">
                <div className="flex items-center justify-between gap-2">
                  <Link className="w-full" href="/dashboard/settings">
                    <span>Settings</span>
                  </Link>
                  <PiGear className="size-8" />
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent variant="aero" className="min-w-36">
                  <DropdownMenuItem className="items-end hover:cursor-pointer">
                    <Link
                      className="w-full text-right"
                      href="/dashboard/settings"
                    >
                      Profile details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="items-end">
                    <Link
                      className="w-full text-right"
                      href="/dashboard/settings/aura"
                    >
                      Aura
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="justify-end hover:cursor-pointer">
                <div className="flex items-center gap-2">
                  <div>Sign out</div>
                  <PiDoorOpen className="text-foreground size-5"></PiDoorOpen>
                </div>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to sign out?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <Button type="button">Sign out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
};
