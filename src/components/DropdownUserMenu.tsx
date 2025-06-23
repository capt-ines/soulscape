"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { PiDoorOpen, PiGear } from "react-icons/pi";

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

import { Button } from "./ui/button";

const DropdownUserMenu = () => {
  const { user } = useUser();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:text-primary ml-3 flex cursor-pointer items-center gap-2 transition duration-400 hover:scale-102">
          {user?.username}
          <ChevronDownIcon className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="mx-content min-w-36 justify-end text-right"
        >
          <DropdownMenuItem className="justify-end hover:cursor-pointer">
            <Link className="flex gap-2" href="/dashboard">
              <span>My profile</span>
            </Link>
            <div className="bg-primary border-foreground h-5 w-5 rounded-full border-1"></div>
          </DropdownMenuItem>

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
              <DropdownMenuSubContent className="min-w-36">
                <DropdownMenuItem className="items-end hover:cursor-pointer">
                  <Link
                    className="w-full text-right"
                    href="/dashboard/settings/details"
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
          <SignOutButton>
            <Button type="button">Sign out</Button>
          </SignOutButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DropdownUserMenu;
