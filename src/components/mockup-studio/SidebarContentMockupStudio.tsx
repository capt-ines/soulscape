import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAdd, IoGridOutline, IoLockOpenOutline } from "react-icons/io5";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Mockup } from "@/types/Mockups";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export const SidebarContentMockupStudio = ({
  mockups,
  mockup,
  profile,
  setProfile,
}: {
  mockups: Mockup[];
}) => {
  const username = mockup ? mockup.username : profile.username;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif">mockup project</h2>
        <h3 className="">{`@${username}`}</h3>

        <Accordion type="single" collapsible>
          <AccordionItem value="browse">
            <AccordionTrigger>Browse your mockups</AccordionTrigger>
            <AccordionContent className="pb-0">
              <ul className="max-h-46 overflow-y-auto">
                <Link
                  href="/dashboard/mockup-studio/new"
                  className="hover:bg-background/10 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition duration-300"
                >
                  <Button
                    className="h-8 w-8"
                    variant={"droplet"}
                    size={"rounded"}
                  >
                    <IoAdd className="text-foreground/80" />
                  </Button>
                  <span className="text-foreground/80 italic">
                    create a new mockup
                  </span>
                </Link>
                {mockups?.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/dashboard/mockup-studio/${m.id}`}
                      className={cn(
                        m.id === mockup?.id && "bg-background/10",
                        "hover:bg-background/10 flex cursor-pointer items-center justify-start gap-3 rounded-lg p-2 transition duration-300",
                      )}
                    >
                      <Avatar className="droplet h-8 w-8">
                        <AvatarImage src={m.avatar || ""} />
                      </Avatar>
                      <span className="font-semibold">{`@${m.username}`}</span>
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <Dialog>
          <DialogTrigger className="flex cursor-pointer items-center gap-1 text-left">
            <p className="text-left underline">Choose a template</p>
            <IoGridOutline />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose a template</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Use</Button>
              </DialogClose>
              <Button type="button">Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex items-start gap-3">
          <Checkbox id="public" />
          <div className="grid gap-2">
            <Label htmlFor="public">
              This mockup is public <IoLockOpenOutline />
            </Label>
            <p className="text-muted-foreground text-sm">
              Other users will be able to search for your mockup and you will be
              able to share it.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="toggle" disabled />
          <Label htmlFor="toggle">Enable notifications</Label>
        </div>

        <Dialog>
          <DialogTrigger className="text-destructive flex cursor-pointer items-center gap-1 text-left">
            <p className="underline">Delete project</p>
            <AiOutlineDelete />
          </DialogTrigger>
          <DialogContent className="bg-destructive/40 inset-shadow-destructive/80">
            <DialogHeader>
              <DialogTitle>Do you want to delete your project?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Cancel</Button>
              </DialogClose>
              <Button variant={"destructive"} type="button">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Separator />
      </div>
    </div>
  );
};
