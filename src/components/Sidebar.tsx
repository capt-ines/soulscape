"use client";

import React, { useEffect, useState } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import ArrowButton from "./ArrowButton";
import NavAddition from "./NavAddition";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useMediaQuery("(min-width: 639px)");

  useEffect(() => {
    setHasMounted(true);
    if (isMobile) setIsOpen(true);
    console.log(isMobile);
  }, [hasMounted]);

  if (!hasMounted) return;
  if (!isMobile)
    return (
      <>
        <Card
          variant="aero"
          className={cn(
            isOpen ? "translate-y-0" : "-translate-y-160",
            "fixed top-0 bottom-0 left-0 z-10 h-fit w-full pr-4 transition duration-500",
          )}
        >
          <div className="my-30 ml-13 flex w-fit gap-5">
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
        <NavAddition>
          <ArrowButton
            direction={isOpen ? "down" : "up"}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </NavAddition>
      </>
    );
  else
    return (
      <Card
        variant="aero"
        className={cn(
          isOpen ? "-translate-x-0" : "-translate-x-80",
          "fixed top-0 bottom-0 left-0 z-10 w-fit max-w-90 pr-4 transition duration-500",
        )}
      >
        <div className="my-30 ml-13 flex w-fit gap-5">
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
          <ArrowButton
            className="-mr-5"
            onClick={() => setIsOpen((prev) => !prev)}
            direction={isOpen ? "right" : "left"}
          />
        </div>
      </Card>
    );
};

export default Sidebar;
