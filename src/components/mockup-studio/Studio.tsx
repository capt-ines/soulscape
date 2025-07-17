"use client";

import { User } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import millify from "millify";
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
  IoRemove,
  IoTrashBin,
  IoTrashBinOutline,
} from "react-icons/io5";
import { PiGridNineFill, PiTag, PiVideo } from "react-icons/pi";
import { TbReplace } from "react-icons/tb";
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
import AddStories from "./AddStories";
import ImageCard from "./ImageCard";
import NewImageButton from "./NewImageButton";
import NewStoryButton from "./NewStoryButton";
import NumericInput from "./NumericInput";
import { ProfilePicture, SinglePicture } from "./ProfilePicture";
import { SidebarContentMockupStudio } from "./SidebarContentMockupStudio";
import StoryCard from "./StoryCard";
import { uploadAsset } from "./uploadAsset";

const Studio = ({ mockups, mockup, user }) => {
  const [profile, setProfile] = useState(mockup ? mockup : newProfileTemplate);
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [pendingStories, setPendingStories] = useState<File[]>([]);

  const supabase = createClient();
  const router = useRouter();
  const images = profile.images;
  const stories = profile.stories;

  const uploadAssets = async ({
    type,
    files,
    userId,
  }: {
    type: "avatar" | "image" | "story";
    files: File[];
    userId: string;
  }): Promise<string[] | { title: string; url: string }[]> => {
    const uploaded: any[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop();
      const name = `${Date.now()}.${ext}`;
      const folder =
        type === "avatar" ? "avatar" : type === "image" ? "images" : "stories";
      const path = `${userId}/${folder}/${name}`;

      const { error } = await supabase.storage
        .from("pictures")
        .upload(path, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: type === "avatar",
        });

      if (error) {
        console.error(`Upload error for ${file.name}`, error.message);
        continue;
      }

      const { data } = supabase.storage.from("pictures").getPublicUrl(path);
      if (!data) continue;

      if (type === "story") {
        uploaded.push({ title: `New story`, url: data.publicUrl });
      } else {
        uploaded.push(data.publicUrl);
      }
    }

    return uploaded;
  };

  const deleteAsset = () => {};

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "image" | "story",
  ) => {
    const files = Array.from(e.target.files || []);
    if (type === "avatar" && files.length) {
      const preview = URL.createObjectURL(files[0]);
      setPendingAvatar(files[0]);
      setProfile((prev) => ({ ...prev, avatar: preview }));
    } else if (type === "image") {
      setPendingImages(files);
      const previews = files.map((f) => URL.createObjectURL(f));
      setProfile((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...previews],
      }));
    } else if (type === "story") {
      setPendingStories(files);
      const previews = files.map((f) => ({
        url: URL.createObjectURL(f),
        title: `New story`,
      }));
      setProfile((prev) => ({
        ...prev,
        stories: [...(prev.stories || []), ...previews],
      }));
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
    const userId = user.id;

    const [avatarUrl, newImageUrls, newStoryObjects] = await Promise.all([
      pendingAvatar
        ? uploadAssets({ type: "avatar", files: [pendingAvatar], userId })
        : Promise.resolve([profile.avatar]),
      pendingImages.length > 0
        ? uploadAssets({ type: "image", files: pendingImages, userId })
        : Promise.resolve([]),
      pendingStories.length > 0
        ? uploadAssets({ type: "story", files: pendingStories, userId })
        : Promise.resolve([]),
    ]);

    const newMockup = {
      ...profile,
      avatar: avatarUrl[0],
      images: [...(mockup?.images || []), ...newImageUrls],
      stories: [...(mockup?.stories || []), ...newStoryObjects],
      id: uuid,
      user_id: userId,
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
        <Card className="flex h-[540px] w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:h-[600px]">
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

          <div className="flex w-full items-center justify-between gap-0">
            <div className="flex-2 px-2">
              <ProfilePicture
                size="h-15 w-15"
                url={profile.avatar}
                handleFileChange={handleFileChange}
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
                      <span className="font-semibold">
                        {millify(profile.posts)}
                      </span>
                      <span className="text-xs">Posts</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {millify(profile.followers)}
                      </span>
                      <span className="text-xs">Followers</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {millify(profile.following)}
                      </span>
                      <span className="text-xs">Following</span>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent variant="droplet" className="w-60">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="posts">Posts</Label>
                        <NumericInput
                          setProfile={setProfile}
                          profile={profile}
                          id={"posts"}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="followers">Followers</Label>
                        <NumericInput
                          setProfile={setProfile}
                          profile={profile}
                          id={"followers"}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="following">Following</Label>
                        <NumericInput
                          setProfile={setProfile}
                          profile={profile}
                          id={"following"}
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

              {profile.links?.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400"
                >
                  <div className="w-3">
                    <IoLink size={12} className="rotate-45" />
                  </div>
                  <span className="overflow-hidden wrap-break-word">
                    {link.name}
                  </span>
                </div>
              ))}
            </PopoverTrigger>

            <PopoverContent
              sideOffset={-20 * profile.links?.length + 20}
              variant="droplet"
              className="w-70"
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      maxLength={30}
                      defaultValue={profile.type}
                      onBlur={(e) => {
                        if (e.target.value.trim() !== "") {
                          setProfile({ ...profile, type: e.target.value });
                        }
                      }}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      defaultValue={profile.bio}
                      onBlur={(e) => {
                        if (e.target.value.trim() !== "") {
                          setProfile({ ...profile, bio: e.target.value });
                        }
                      }}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="links">Links</Label>

                    <motion.div
                      layout
                      className="col-span-2 flex flex-col gap-0.5"
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                    >
                      <AnimatePresence>
                        {profile.links?.map((link) => {
                          return (
                            <motion.div
                              key={link.id}
                              className="flex items-center gap-0.5"
                              layout
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                maxLength={60}
                                defaultValue={link.name}
                                onBlur={(e) => {
                                  const trimmed = e.target.value.trim();
                                  if (trimmed === "") {
                                    const updatedLinks = profile.links.filter(
                                      (l) => l.id !== link.id,
                                    );
                                    setProfile({
                                      ...profile,
                                      links: updatedLinks,
                                    });
                                  } else {
                                    const updatedLinks = profile.links.map(
                                      (l) =>
                                        l.id === link.id
                                          ? { ...l, name: trimmed }
                                          : l,
                                    );
                                    setProfile({
                                      ...profile,
                                      links: updatedLinks,
                                    });
                                  }
                                }}
                                className="h-8 text-indigo-500 dark:text-indigo-400"
                              />
                              <Button
                                onClick={() => {
                                  const updatedLinks = profile.links?.filter(
                                    (l) => l.id !== link.id,
                                  );
                                  setProfile({
                                    ...profile,
                                    links: updatedLinks,
                                  });
                                }}
                                variant={"droplet"}
                                size={"sm"}
                              >
                                <IoRemove />
                              </Button>
                            </motion.div>
                          );
                        })}

                        <Button
                          disabled={profile.links?.length >= 5}
                          variant={"droplet"}
                          onClick={() =>
                            setProfile({
                              ...profile,
                              links: [
                                ...profile.links,
                                { id: uuidv4(), name: "click.me" },
                              ],
                            })
                          }
                        >
                          <IoAdd />
                        </Button>
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex w-full justify-between gap-1 px-2">
            <div className="bg-muted flex h-9 flex-1 items-center justify-center rounded-sm px-4 py-2 text-sm font-bold whitespace-nowrap hover:cursor-default has-[>svg]:px-3">
              Edit
            </div>
            <div className="bg-muted hover:text-foreground hover:bg-muted flex h-9 flex-1 items-center justify-center rounded-sm px-4 py-2 font-bold whitespace-nowrap hover:cursor-default has-[>svg]:px-3">
              Share profile
            </div>
            <div className="bg-muted hover:text-foreground hover:bg-muted flex h-9 items-center justify-center rounded-sm px-4 py-2 whitespace-nowrap hover:cursor-default has-[>svg]:px-3">
              <IoPersonAddOutline />
            </div>
          </div>

          <div className="flex text-xs">
            <NewStoryButton onChange={(e) => handleFileChange(e, "story")} />
            <div className="flex overflow-x-auto">
              {stories?.map((story, index: number) => (
                <StoryCard
                  story={story}
                  index={index}
                  key={index}
                  replaceStory={handleFileChange}
                  deleteStory={deleteAsset}
                />
              ))}
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
              <NewImageButton onChange={(e) => handleFileChange(e, "image")} />
              {images?.map((image: string, index: number) => (
                <ImageCard
                  image={image}
                  index={index}
                  key={index}
                  replaceImage={handleFileChange}
                  deleteImage={deleteAsset}
                />
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
