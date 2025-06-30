"use client";

import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Settings = () => {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3 px-4 py-4 sm:px-8">
      <Tabs defaultValue="personalDetails" className="max-w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="personalDetails">Personal details</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personalDetails">
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-sm">
              Change your username or password.
            </p>
            <Input />
            <Input />
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="flex flex-col gap-3">
            <h2>Notifications</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
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
        </TabsContent>
      </Tabs>

      <Separator className="mt-6" />

      <div className="flex flex-col gap-5">
        <p className="text-muted-foreground text-sm">
          Choose theme color which represents your soul the best.
        </p>
        <div className="w-full text-center">
          <Link href={"/dashboard/settings/aura"}>
            <Button className="glow">Change your aura</Button>
          </Link>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="w-full text-center">
        <Dialog>
          <DialogTrigger>
            <Button variant={"secondary"} className="px-12">
              Sign out
            </Button>
          </DialogTrigger>
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
      </div>

      <div className="hover:text-destructive text-muted-foreground flex cursor-pointer items-center gap-1 pt-18 text-center text-sm transition duration-200">
        <p className=" ">Delete your account</p>
        <AiOutlineDelete />
      </div>
    </div>
  );
};
