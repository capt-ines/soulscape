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
import type { Mockup } from "@/types/Mockups";
import { createClient } from "@/utils/supabase/client";

import Toolbar from "./Toolbar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";

const Studio = ({ mockup, user }) => {
  console.log(mockup);
  const [profile, setProfile] = useState(mockup ? mockup : newProfileTemplate);
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);

  const supabase = createClient();

  const router = useRouter();

  const uploadAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: previewUrl }));

    setPendingAvatar(file);
  };
  const save = async () => {
    const uuid = uuidv4();
    let avatarUrl = profile.avatar;

    // If there's a pending avatar upload, do it now
    if (pendingAvatar) {
      const fileExt = pendingAvatar.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, pendingAvatar);

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError.message);
        return;
      }

      const { data: avatarData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      avatarUrl = avatarData.publicUrl;
    }

    const res = await supabase
      .from("mockups")
      .insert({ ...profile, avatar: avatarUrl, user_id: user.id, id: uuid });

    if (res.error) {
      console.error("Error saving data:", res.error.message);
      return;
    }

    router.push(`/dashboard/mockup-studio/${uuid}`);
  };

  return (
    <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
      <Card className="flex max-h-[540px] max-w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:max-h-[600px]">
        <Popover>
          <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-lg font-semibold transition duration-200">
            <span>{profile.username}</span>
          </PopoverTrigger>
          <PopoverContent className="w-70" variant="droplet">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="posts">@username</Label>
                <Input
                  onBlur={(e) => {
                    if (e.target.value.trim() !== "") {
                      setProfile({ ...profile, username: e.target.value });
                    }
                  }}
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex-2 px-2">
            <Avatar className="h-15 w-15">
              <label className="hover:bg-accent/30 absolute h-15 w-15 rounded-full transition duration-200 hover:cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    uploadAvatar(e);
                  }}
                />
              </label>
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
              <PopoverContent variant="droplet" className="w-70">
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="posts">Name</Label>
                    <Input
                      onBlur={(e) => {
                        if (e.target.value.trim() !== "") {
                          setProfile({ ...profile, name: e.target.value });
                        }
                      }}
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
              <PopoverContent variant="droplet" className="w-60">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="posts">Posts</Label>
                      <NumericFormat
                        customInput={Input}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") {
                            setProfile({ ...profile, posts: e.target.value });
                          }
                        }}
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
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") {
                            setProfile({
                              ...profile,
                              followers: e.target.value,
                            });
                          }
                        }}
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
                        onBlur={(e) => {
                          if (e.target.value.trim() !== "") {
                            setProfile({
                              ...profile,
                              following: e.target.value,
                            });
                          }
                        }}
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
          <PopoverContent variant="droplet" className="w-70">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="posts">Type</Label>
                  <Input
                    onBlur={(e) => {
                      if (e.target.value.trim() !== "") {
                        setProfile({ ...profile, type: e.target.value });
                      }
                    }}
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
                    onBlur={(e) => {
                      if (e.target.value.trim() !== "") {
                        setProfile({ ...profile, links: e.target.value });
                      }
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex w-full justify-between gap-1 px-2">
          <Button variant={"ghost"} className="bg-muted flex-1 font-bold">
            Edit
          </Button>
          <Button variant={"ghost"} className="bg-muted flex-1 font-bold">
            Share profile
          </Button>
          <Button variant={"ghost"} className="bg-muted">
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
