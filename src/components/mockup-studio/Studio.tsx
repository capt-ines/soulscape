"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  IoAdd,
  IoGridOutline,
  IoLink,
  IoLockOpenOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
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

import { Sidebar } from "../Sidebar";
import Toolbar from "../Toolbar";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import AddImages from "./AddImages";
import { ProfilePicture, SinglePicture } from "./ProfilePicture";
import { SidebarContentMockupStudio } from "./SidebarContentMockupStudio";

const Studio = ({ mockups, mockup, user }) => {
  const [profile, setProfile] = useState(mockup ? mockup : newProfileTemplate);
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  console.log(profile);
  const supabase = createClient();
  const router = useRouter();
  const images = profile.images;

  const uploadImages = (e) => {
    const files = Array.from(e.target.files);
    setPendingImages(files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setProfile((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...imagePreviews],
    }));
  };

  const uploadAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: previewUrl }));

    setPendingAvatar(file);
  };

  const saveImages = async () => {
    const uploadedUrls: string[] = [];

    for (const image of pendingImages) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/images/${fileName}`;

      const { data, error } = await supabase.storage
        .from("pictures")
        .upload(filePath, image, {
          cacheControl: "3600",
          contentType: image.type,
        });

      if (error) {
        console.error("Upload error for", image.name, error.message);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("pictures")
        .getPublicUrl(filePath);

      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  };

  const saveAvatar = async () => {
    if (pendingAvatar) {
      let avatarUrl = profile.avatar;
      const fileExt = pendingAvatar.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("pictures")
        .upload(filePath, pendingAvatar);

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError.message);
        return;
      }

      const { data: avatarData } = supabase.storage
        .from("pictures")
        .getPublicUrl(filePath);
      avatarUrl = avatarData.publicUrl;

      return avatarUrl;
    }
  };

  const saveMockup = async (mockupData) => {
    const { data, error } = await supabase
      .from("mockups")
      .upsert(mockupData, { onConflict: "id" });

    if (error) {
      console.error("Error saving data:", error.message);
      return null;
    }

    return data;
  };

  const handleSave = async () => {
    const uuid = mockup ? mockup.id : uuidv4();

    const avatarUrl = await saveAvatar();
    const newImageUrls = await saveImages();
    const allImages = [...(mockup?.images || []), ...newImageUrls];

    const newMockup = {
      ...profile,
      avatar: avatarUrl,
      images: allImages,
      id: uuid,
      user_id: user.id,
    };
    await saveMockup(newMockup);
    router.push(`/dashboard/mockup-studio/${uuid}`);
  };

  return (
    <>
      <Sidebar>
        <SidebarContentMockupStudio
          profile={profile}
          setProfile={setProfile}
          mockup={mockup}
          mockups={mockups}
        />
      </Sidebar>

      <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
        <Card className="flex h-[540px] max-w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:h-[600px]">
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
              <ProfilePicture
                size="h-15 w-15"
                url={profile.avatar}
                uploadPicture={uploadAvatar}
              />
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
              {/* <StoryButton
                size="h-10 w-10"
                url={""}
                uploadPicture={() => {}}
              /> */}
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
              <AddImages handleUpload={uploadImages} />
              {images?.map((image: string, index: number) => (
                <div
                  key={index}
                  className="bg-background relative col-span-1 h-32"
                >
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    fill
                    className="cursor-pointer object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Toolbar save={handleSave} />
      </div>
    </>
  );
};

export default Studio;
