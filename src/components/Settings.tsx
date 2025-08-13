"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
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

import { ProfilePicture } from "./mockup-studio/ProfilePicture";

export const Settings = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-3 px-4 py-4 sm:px-8">
      <Tabs defaultValue="account" className="w-full max-w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="account">account</TabsTrigger>
          <TabsTrigger value="preferences">preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-sm">
                Manage your account details.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">username</p>
              <Separator className="muted-background" />
              <span className="text-sm">{user?.username}</span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">password</p>
              <Separator className="muted-background" />
              <span className="text-sm">{user?.username}</span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">email addresses</p>
              <Separator className="muted-background" />
              <ul className="flex flex-col gap-1 text-sm wrap-anywhere">
                {user?.emailAddresses.map((e, index) => (
                  <li key={index}>{e.emailAddress}</li>
                ))}
              </ul>
            </div>

            <Separator className="muted-background" />

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
                    <DialogClose>
                      <Button type="button">Cancel</Button>
                    </DialogClose>

                    <Button asChild type="button">
                      <SignOutButton>Sign out</SignOutButton>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Separator className="muted-background" />

            <div className="hover:text-destructive text-muted-foreground flex cursor-pointer items-center justify-center gap-1 text-center text-sm transition duration-200">
              <p className=" ">Delete your account</p>
              <AiOutlineDelete />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="flex flex-col gap-5">
            <p className="text-muted-foreground text-sm">
              Choose theme color which represents your soul the best.
            </p>
            <div className="w-full text-center">
              <Link href={"/dashboard/aura"}>
                <Button className="glow">Change your aura</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
