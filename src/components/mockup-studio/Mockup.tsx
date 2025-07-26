import { User } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import millify from "millify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
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
import { toast } from "sonner";
import useUndo from "use-undo";
import { v4 as uuidv4 } from "uuid";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createNewMockupTemplate } from "@/constants/NewMockupTemplate";
import { type Mockup as MockupType } from "@/types/MockupType";
import { getStoragePathFromPublicUrl } from "@/utils/getStoragePathFromPublicUrl";
import { createClient } from "@/utils/supabase/client";

import { Sidebar } from "../Sidebar";
import Toolbar from "../Toolbar";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import { deleteAssetsFromStorage } from "./deleteAssetsFromStorage";
import ImageCard from "./ImageCard";
import NewImageButton from "./NewImageButton";
import NewStoryButton from "./NewStoryButton";
import NumericInput from "./NumericInput";
import { ProfilePicture } from "./ProfilePicture";
import { SidebarContentMockupStudio } from "./SidebarContentMockupStudio";
import StoryCard from "./StoryCard";

type MockupProps = {
  type: "editable" | "preview";
  mockup: MockupType;
  mockupRef: React.RefObject<HTMLDivElement | null>;
  assetsPreview: {
    avatar: null;
    images: never[];
    stories: never[];
  };
  setMockup: React.Dispatch<MockupType>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "image" | "story",
  ) => void;
  deleteAsset: (
    type: "stories" | "images" | "avatar",
    index?: number,
    isPreview?: boolean,
  ) => void;
};

export const Mockup = ({
  type,
  mockup,
  mockupRef,
  assetsPreview,
  handleFileChange,
  deleteAsset,
  setMockup,
}: MockupProps) => {
  return type === "editable" ? (
    <Card className="flex h-[540px] w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:h-[600px]">
      <Popover>
        <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-lg font-semibold transition duration-200">
          <span>@{mockup.username}</span>
        </PopoverTrigger>
        <PopoverContent className="w-70" variant="droplet">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="posts">@username</Label>
              <Input
                defaultValue={mockup.username}
                onBlur={(e) => {
                  if (e.target.value.trim() !== "") {
                    setMockup({
                      ...mockup,
                      username: e.target.value,
                    });
                  }
                }}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex w-full items-center justify-between">
        <div className="ml-2 h-[68px]">
          <ProfilePicture
            deleteProfilePicture={() => deleteAsset("avatar")}
            src={assetsPreview.avatar || mockup.avatar}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, "avatar")
            }
          />
        </div>

        <div className="flex flex-col justify-center gap-0">
          <Popover>
            <PopoverTrigger className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-xs font-semibold transition duration-200">
              {mockup.name ? (
                <span>{mockup.name}</span>
              ) : (
                <span className="text-muted-foreground italic">Name</span>
              )}
            </PopoverTrigger>
            <PopoverContent variant="droplet" className="w-70">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="posts">Name</Label>
                  <Input
                    defaultValue={mockup.name}
                    onBlur={(e) => {
                      setMockup({
                        ...mockup,
                        name: e.target.value,
                      });
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
                  <span className="font-semibold">{millify(mockup.posts)}</span>
                  <span className="text-xs">Posts</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {millify(mockup.followers)}
                  </span>
                  <span className="text-xs">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {millify(mockup.following)}
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
                      setMockup={setMockup}
                      mockup={mockup}
                      id={"posts"}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="followers">Followers</Label>
                    <NumericInput
                      setMockup={setMockup}
                      mockup={mockup}
                      id={"followers"}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="following">Following</Label>
                    <NumericInput
                      setMockup={setMockup}
                      mockup={mockup}
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
          {mockup.type ? (
            <span className="text-muted-foreground">{mockup.type}</span>
          ) : (
            <span className="text-muted-foreground italic">Profile type</span>
          )}

          {mockup.bio ? (
            <span>{mockup.bio}</span>
          ) : (
            <span className="text-muted-foreground italic">Bio</span>
          )}

          {mockup.links.length ? (
            mockup.links.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400"
              >
                <div className="w-3">
                  <IoLink size={12} className="rotate-45" />
                </div>
                <span className="overflow-hidden wrap-break-word">
                  {link.url}
                </span>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground flex items-center gap-0.5 italic">
              <div className="w-3">
                <IoLink size={12} className="rotate-45" />
              </div>
              <span>Links</span>
            </div>
          )}
        </PopoverTrigger>

        <PopoverContent
          sideOffset={-20 * mockup.links?.length + 20}
          variant="droplet"
          className="w-70"
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="type">Type</Label>
                <Input
                  maxLength={30}
                  defaultValue={mockup.type || ""}
                  onBlur={(e) => {
                    setMockup({
                      ...mockup,
                      type: e.target.value,
                    });
                  }}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  defaultValue={mockup.bio}
                  onBlur={(e) => {
                    setMockup({
                      ...mockup,
                      bio: e.target.value,
                    });
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
                    {mockup.links?.map((link) => {
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
                            defaultValue={link.url}
                            onBlur={(e) => {
                              const trimmed = e.target.value.trim();
                              if (trimmed === "") {
                                const updatedLinks = mockup.links.filter(
                                  (l) => l.id !== link.id,
                                );
                                setMockup({
                                  ...mockup,
                                  links: updatedLinks,
                                });
                              } else {
                                const updatedLinks = mockup.links.map((l) =>
                                  l.id === link.id ? { ...l, url: trimmed } : l,
                                );
                                setMockup({
                                  ...mockup,
                                  links: updatedLinks,
                                });
                              }
                            }}
                            className="h-8 text-indigo-500 dark:text-indigo-400"
                          />
                          <Button
                            onClick={() => {
                              const updatedLinks = mockup.links?.filter(
                                (l) => l.id !== link.id,
                              );
                              setMockup({
                                ...mockup,
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
                      disabled={mockup.links?.length >= 5}
                      variant={"droplet"}
                      onClick={() =>
                        setMockup({
                          ...mockup,
                          links: [
                            ...mockup.links,
                            { id: uuidv4(), url: "click.me" },
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
          {mockup.stories?.map((story, index: number) => (
            <StoryCard
              story={story}
              index={index}
              key={index}
              deleteStory={() => deleteAsset("stories", index, false)}
            />
          ))}
          {assetsPreview.stories?.map((story, index: number) => (
            <StoryCard
              story={story}
              index={index}
              key={index}
              deleteStory={() => deleteAsset("stories", index, true)}
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
        </div>{" "}
      </div>

      <div className="-mx-2.5 grid grid-flow-row grid-cols-3 gap-0.5">
        <NewImageButton onChange={(e) => handleFileChange(e, "image")} />
        {mockup.images?.map((image, index) => (
          <ImageCard
            image={image}
            index={index}
            key={index}
            deleteImage={() => deleteAsset("images", index, false)}
          />
        ))}

        {assetsPreview.images?.map((image, index) => (
          <ImageCard
            image={image}
            index={index}
            key={index}
            deleteImage={() => deleteAsset("images", index, true)}
          />
        ))}
      </div>
    </Card>
  ) : (
    type === "preview" && (
      <div ref={mockupRef}>
        <Card className="flex h-[540px] w-[295px] flex-col gap-2 overflow-auto p-3 text-sm sm:h-[600px]">
          <span className="px-2 py-1 text-left text-lg font-semibold">
            @{mockup.username}
          </span>

          <div className="flex w-full items-center justify-between">
            {mockup.avatar || assetsPreview.avatar ? (
              <div className="ml-2">
                <div className="group relative h-16 w-16 rounded-full">
                  <Image
                    src={assetsPreview?.avatar || mockup.avatar}
                    alt="profile picture"
                    fill
                    sizes="(width: 64px, height: 64px)"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="hover:bg-muted hover:text-muted-foreground my-0.5 ml-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300">
                <IoAdd size={18} />
              </div>
            )}

            <div className="flex flex-col justify-center gap-0">
              {mockup.name ? (
                <span className="px-2 py-1 text-left text-xs font-semibold">
                  {mockup.name}
                </span>
              ) : null}

              <div className="flex flex-3 items-center justify-between gap-4 px-2 py-1">
                <div className="flex flex-col items-center">
                  <span className="font-semibold">{millify(mockup.posts)}</span>
                  <span className="text-xs">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">
                    {millify(mockup.followers)}
                  </span>
                  <span className="text-xs">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold">
                    {millify(mockup.following)}
                  </span>
                  <span className="text-xs">Following</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex cursor-pointer flex-col px-2 py-1 text-left transition duration-200">
            {mockup.type ? (
              <span className="text-muted-foreground">{mockup.type}</span>
            ) : null}

            {mockup.bio ? <span>{mockup.bio}</span> : null}

            {mockup.links.length
              ? mockup.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400"
                  >
                    <div className="w-3">
                      <IoLink size={12} className="rotate-45" />
                    </div>
                    <span className="overflow-hidden wrap-break-word">
                      {link.url}
                    </span>
                  </div>
                ))
              : null}
          </div>

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
            <div className="flex w-18 flex-col items-center gap-1 py-2">
              <div className="flex h-13 w-13 items-center justify-center rounded-full border-2">
                <IoAdd size={18} />
              </div>
              <div className="w-16 overflow-hidden text-center whitespace-nowrap">
                <span className="block truncate">New story</span>
              </div>
            </div>

            <div className="flex overflow-x-auto">
              {mockup.stories?.map((story, index: number) => (
                <div
                  key={index}
                  className="hover:bg-muted flex w-18 cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-2 transition duration-300"
                >
                  <div className="relative h-13 w-13 rounded-full border-3">
                    <Image
                      src={story.url}
                      alt={`Story ${index + 1}`}
                      fill
                      sizes="(width: 52px), (height: 52px)"
                      className="rounded-full p-0.5"
                    />
                  </div>
                  <div className="w-16 overflow-hidden text-center whitespace-nowrap">
                    <span className="block truncate">{story.title}</span>
                  </div>
                </div>
              ))}
              {assetsPreview?.stories?.map((story, index: number) => (
                <div
                  key={index}
                  className="hover:bg-muted flex w-18 cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-2 transition duration-300"
                >
                  <div className="relative h-13 w-13 rounded-full border-3">
                    <Image
                      src={story.url}
                      alt={`Story ${index + 1}`}
                      fill
                      sizes="(width: 52px), (height: 52px)"
                      className="rounded-full p-0.5"
                    />
                  </div>
                  <div className="w-16 overflow-hidden text-center whitespace-nowrap">
                    <span className="block truncate">{story.title}</span>
                  </div>
                </div>
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
          </div>

          <div className="-mx-2.5 grid grid-flow-row grid-cols-3 gap-0.5">
            {mockup.images?.map((image, index) => (
              <div
                key={index}
                className="group bg-background relative col-span-1 h-32"
              >
                <div className="group-hover:bg-muted/30 absolute z-50 h-full w-full cursor-pointer transition duration-300" />
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  sizes="(width: 88.34px), (height: 128px)"
                  className="cursor-pointer object-cover"
                />
              </div>
            ))}

            {assetsPreview?.images?.map((image, index) => (
              <div
                key={index}
                className="group bg-background relative col-span-1 h-32"
              >
                <div className="group-hover:bg-muted/30 absolute z-50 h-full w-full cursor-pointer transition duration-300" />
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  sizes="(width: 88.34px), (height: 128px)"
                  className="cursor-pointer object-cover"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  );
};
