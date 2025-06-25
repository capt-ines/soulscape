"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoAdd, IoLink, IoPersonAddOutline } from "react-icons/io5";
import { PiGridNineFill, PiTag, PiVideo } from "react-icons/pi";
import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { newProfileTemplate } from "@/constants/NewProfileTemplate";
import { useUserDataStore } from "@/store/userDataStore";
import { useUserStore } from "@/store/userStore";
import type { Mockup } from "@/types/Mockups";
import { createClient } from "@/utils/supabase/client";

import Toolbar from "./Toolbar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";

const Studio = ({ mockupId }: { mockupId?: string }) => {
  const userData = useUserDataStore((s) => s.userData);
  const user = useUserStore((s) => s.user);
  const [profile, setProfile] = useState(null as Mockup);
  const supabase = createClient();
  const router = useRouter();

  const save = async ({ data }: { data: Mockup }) => {
    const uuid = uuidv4();
    const res = await supabase
      .from("mockups")
      .insert({ ...profile, user_id: user?.id, id: uuid });

    console.log(res);

    if (res.error) {
      console.error("Error saving data:", res.error.message);
      return;
    }
    //TODO: fix redirecting
    // router.push(`/dashboard/mockup-studio/${uuid}`);
  };

  useEffect(() => {
    if (mockupId === "new") {
      setProfile(newProfileTemplate);
    } else {
      const mockup = userData?.mockups.find((mockup) => mockup.id === mockupId);
      setProfile(mockup);
    }
  }, [userData, mockupId]);

  if (!profile) {
    return (
      <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
        <Card className="flex h-[540px] w-[295px] flex-col gap-3 overflow-auto p-3 text-sm sm:h-[600px]">
          <div>
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <div className="flex w-full items-center justify-between gap-1 py-2 pr-3 pl-2">
            <Skeleton className="h-15 w-15 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="mt-1 h-3 w-27" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-10" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-10" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1 py-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-28" />
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-between gap-1 px-2">
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          {/* Action Icons */}
          <div className="flex gap-3 p-2 text-xs">
            {[...Array(4)].map((_, i) => (
              <div className="flex flex-col items-center gap-1" key={i}>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-2 w-10" />
              </div>
            ))}
          </div>

          {/* Tab Bar */}
          <div className="-mx-3.5">
            <div className="mb-1 flex min-h-6 justify-around">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-12 rounded-sm" />
              ))}
            </div>

            {/* Grid Thumbnails */}
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="min-h-24 min-w-20" />
              ))}
            </div>
          </div>
        </Card>
        <Toolbar />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
      <Card className="flex max-h-[540px] max-w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:max-h-[600px]">
        <Popover>
          <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-lg font-semibold transition duration-200">
            <span>{profile.username}</span>
          </PopoverTrigger>
          <PopoverContent className="w-70">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="posts">@username</Label>
                <Input
                  onBlur={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex-2 px-2">
            <Avatar className="h-15 w-15">
              <button className="hover:bg-accent/30 absolute h-15 w-15 rounded-full transition duration-200 hover:cursor-pointer" />
              <AvatarImage src={profile.avatar || ""} />
              <AvatarFallback>
                <div className="bg-card flex h-15 w-15 items-center rounded-full border-2">
                  <IoAdd className="w-full" size={"26"} />
                </div>
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center gap-0">
            <Popover>
              <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-xs font-semibold transition duration-200">
                <span>{profile.name}</span>
              </PopoverTrigger>
              <PopoverContent className="w-70">
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="posts">Name</Label>
                    <Input
                      onBlur={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 transition duration-200">
                <div className="flex flex-3 items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-semibold">{profile.posts}</span>
                    <span className="text-xs">Posts</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{profile.followers}</span>
                    <span className="text-xs">Followers</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{profile.following}</span>
                    <span className="text-xs">Following</span>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="posts">Posts</Label>
                      <NumericFormat
                        customInput={Input}
                        onBlur={(e) =>
                          setProfile({ ...profile, posts: +e.target.value })
                        }
                        id="posts"
                        className="col-span-2 h-8"
                        thousandSeparator=","
                        allowNegative={false}
                        allowLeadingZeros={false}
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="followers">Followers</Label>
                      <NumericFormat
                        customInput={Input}
                        onBlur={(e) =>
                          setProfile({ ...profile, followers: e.target.value })
                        }
                        id="followers"
                        className="col-span-2 h-8"
                        thousandSeparator=","
                        allowNegative={false}
                        allowLeadingZeros={false}
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="following">Following</Label>
                      <NumericFormat
                        customInput={Input}
                        onBlur={(e) =>
                          setProfile({ ...profile, following: e.target.value })
                        }
                        id="following"
                        className="col-span-2 h-8"
                        thousandSeparator=","
                        allowNegative={false}
                        allowLeadingZeros={false}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Popover>
          <PopoverTrigger className="hover:bg-accent flex cursor-pointer flex-col rounded-md px-2 py-1 text-left transition duration-200">
            <span className="text-muted-foreground">{profile.type}</span>
            <span>{profile.bio}</span>
            <div className="flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400">
              <IoLink className="rotate-45" />
              <span>{profile.links}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-70">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="posts">Type</Label>
                  <Input
                    onBlur={(e) =>
                      setProfile({ ...profile, type: e.target.value })
                    }
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="followers">Bio</Label>
                  <Textarea
                    onBlur={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="following">Links</Label>
                  <Input
                    onBlur={(e) =>
                      setProfile({ ...profile, links: e.target.value })
                    }
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex w-full justify-between gap-1 px-2">
          <Button variant={"secondary"} className="flex-1 font-bold">
            Edit
          </Button>
          <Button variant={"secondary"} className="flex-1 font-bold">
            Share profile
          </Button>
          <Button variant={"secondary"}>
            <IoPersonAddOutline />
          </Button>
        </div>
        <div className="flex gap-3 p-2 text-xs">
          <div className="flex flex-col items-center gap-1">
            <button className="button border-seconadry flex aspect-square w-10 items-center rounded-full border-2">
              <IoAdd className="w-full" size={"21"} />
            </button>
            <span>New</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-primary aspect-square w-10 rounded-full" />
            <span>Title</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-primary aspect-square w-10 rounded-full" />
            <span>Title</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-primary aspect-square w-10 rounded-full" />
            <span>Title</span>
          </div>
        </div>

        <div className="-mx-3.5">
          <div className="mb-0.5 flex min-h-6 justify-around">
            <div className="border-foreground flex w-12 items-center justify-center border-b-2">
              <PiGridNineFill size={"23"} className="mb-1 rotate-90" />
            </div>
            <div className="flex w-12 items-center justify-center border-b-2 border-transparent">
              <PiVideo size={"23"} className="mb-1" />
            </div>
            <div className="flex w-12 items-center justify-center border-b-2 border-transparent">
              <PiTag size={"23"} className="mb-1 -rotate-45" />
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-0.5">
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
            <div className="bg-accent min-h-25 min-w-20" />
          </div>
        </div>
      </Card>
      <Toolbar save={save} />
    </div>
  );
};

export default Studio;
