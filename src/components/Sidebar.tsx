"use client";

import { cva } from "class-variance-authority";
import React, { useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import ArrowButton from "./ArrowButton";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop)
    return <SidebarCard key="1" screenSize="desktop" isDefaultOpen />;
  else if (isMobile) return <SidebarCard key="2" screenSize="mobile" />;
  else return null;
};

type SidebarCardProps = {
  screenSize: "desktop" | "mobile";
  isDefaultOpen?: boolean;
};

const SidebarCard = ({ screenSize, isDefaultOpen }: SidebarCardProps) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const arrowDirection = {
    desktop: isOpen ? "left" : "right",
    mobile: isOpen ? "up" : "down",
  }[screenSize];

  return (
    <>
      <Card
        variant="flat"
        className={cn(
          SidebarCardVariants({ position: screenSize, open: isOpen }),
        )}
      >
        <div className="mx-12 my-30 flex w-fit gap-5">
          <div className="flex flex-col gap-5">
            <h2>Mockup projects</h2>
            <Separator />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Choose a template</Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="terms-2" defaultChecked />
                <div className="grid gap-2">
                  <Label htmlFor="terms-2">Accept terms and conditions</Label>
                  <p className="text-muted-foreground text-sm">
                    By clicking this checkbox, you agree to the terms and
                    conditions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="toggle" disabled />
                <Label htmlFor="toggle">Enable notifications</Label>
              </div>
              <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                  id="toggle-2"
                  defaultChecked
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">
                    Enable notifications
                  </p>
                  <p className="text-muted-foreground text-sm">
                    You can enable or disable notifications at any time.
                  </p>
                </div>
              </Label>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col items-center">
        <div
          className={cn(
            SidebarArrowVariants({ position: screenSize, open: isOpen }),
          )}
        >
          <div className="w-auto">
            <ArrowButton
              direction={arrowDirection}
              onClick={() => setIsOpen((prev) => !prev)}
              className="transition duration-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarCardVariants = cva(
  "fixed z-10 transition-transform duration-500",
  {
    variants: {
      position: {
        desktop:
          " -translate-x-160 top-0 pr-7 h-full w-[360px] bottom-0 left-0",
        mobile: "-translate-y-160 h-fit right-0 left-0 top-0",
      },
      open: {
        true: "translate-x-0 translate-y-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        position: "desktop",
        open: true,
        class: "translate-x-0",
      },
      {
        position: "mobile",
        open: true,
        class: "translate-y-0",
      },
    ],
  },
);

const SidebarArrowVariants = cva(
  "fixed top-5 z-20 m-4 transition duration-500 flex items-center justify-center",
  {
    variants: {
      position: {
        desktop: "left-0 h-full -translate-x-0",
        mobile: "w-full top-0",
      },
      open: {
        true: "",
        false: "", // base case for defaulting compound logic
      },
    },
    compoundVariants: [
      {
        position: "desktop",
        open: true,
        class: "translate-x-70",
      },
    ],
  },
);
