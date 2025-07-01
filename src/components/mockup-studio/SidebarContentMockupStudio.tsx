import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoGridOutline, IoLockOpenOutline } from "react-icons/io5";

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
import { Mockup } from "@/types/Mockups";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export const SidebarContentMockupStudio = ({
  mockups,
}: {
  mockups: Mockup[];
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif">mockup project</h2>
        <h3 className="">@slyThirdEye</h3>
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

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Browse your mockups</AccordionTrigger>
            <AccordionContent>
              {mockups?.map((mockup) => (
                <div key={mockup.id}>{mockup.username}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
