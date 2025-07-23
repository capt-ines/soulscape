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
import { toast } from "sonner";
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
import { type Mockup } from "@/types/Mockup";
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

type StudioProps = {
  mockupsData: Mockup[];
  mockupData: Mockup;
  user: User;
};

const Studio = ({ mockupsData, mockupData, user }: StudioProps) => {
  const supabase = createClient();
  const router = useRouter();
  const [mockup, setMockup] = useState(
    mockupData ? mockupData : createNewMockupTemplate(),
  );

  const [assetsPreview, setAssetsPreview] = useState({
    avatar: null,
    images: [],
    stories: [],
  });
  const [assetsFiles, setAssetsFiles] = useState({
    avatar: null,
    images: [],
    stories: [],
  });
  const [deletedAssetsFiles, setDeletedAssetsFiles] = useState({
    avatar: "",
    images: [],
    stories: [],
  });

  const uploadAssetsToStorage = async ({
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

  const deleteAsset = (
    type: "stories" | "images" | "avatar",
    index?: number,
    isPreview?: boolean,
  ) => {
    if (type === "avatar") {
      if (mockup.avatar) {
        const assetPath = getStoragePathFromPublicUrl(mockup.avatar);
        setDeletedAssetsFiles((prev) => ({
          ...prev,
          avatar: assetPath,
        }));
        setMockup((prev) => ({
          ...prev,
          avatar: null,
        }));
      } else {
        setAssetsPreview((prev) => ({
          ...prev,
          avatar: null,
        }));
        setAssetsFiles((prev) => ({
          ...prev,
          avatar: null,
        }));
      }
      return;
    }

    if (isPreview) {
      const updatedPreviews = [...assetsPreview[type]];
      updatedPreviews.splice(index!, 1); // index is required here
      setAssetsPreview((prev) => ({
        ...prev,
        [type]: updatedPreviews,
      }));

      const updatedFiles = [...assetsFiles[type]];
      updatedFiles.splice(index!, 1);
      setAssetsFiles((prev) => ({
        ...prev,
        [type]: updatedFiles,
      }));
    } else {
      const updated = [...mockup[type]];
      const [removedItem] = updated.splice(index!, 1);

      // 👇 Extract path from removed item
      const pathToDelete =
        type === "stories"
          ? getStoragePathFromPublicUrl(removedItem?.url)
          : getStoragePathFromPublicUrl(removedItem);
      console.log(removedItem);
      setDeletedAssetsFiles((prev) => {
        const existing = prev[type] || [];
        return {
          ...prev,
          [type]: [...existing, pathToDelete],
        };
      });

      setMockup((prev) => ({
        ...prev,
        [type]: updated,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "image" | "story",
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));

    setAssetsFiles((prev) => ({
      ...prev,
      [type === "avatar" ? "avatar" : type === "image" ? "images" : "stories"]:
        type === "avatar" ? files[0] : [...(prev.images || []), ...files],
    }));

    setAssetsPreview((prev) => ({
      ...prev,
      [type === "avatar" ? "avatar" : type === "image" ? "images" : "stories"]:
        type === "avatar"
          ? previews[0]
          : type === "image"
            ? [...(prev.images || []), ...previews]
            : [
                ...(prev.stories || []),
                ...previews.map((url) => ({ url, title: "New story" })),
              ],
    }));
  };

  const saveMockup = async (readyMockup: Mockup) => {
    const { data, error } = await supabase
      .from("mockups")
      .upsert(readyMockup, { onConflict: "id" });

    if (error) {
      console.error("Error saving data:", error.message);
      return null;
    }

    return data;
  };

  const handleSave = async () => {
    const toastId = toast.loading("Saving in progress...");
    const uuid = mockupData ? mockupData.id : uuidv4();
    const userId = user.id;
    try {
      const [avatarUrl, newImageUrls, newStoryObjects] = await Promise.all([
        assetsFiles.avatar
          ? uploadAssetsToStorage({
              type: "avatar",
              files: [assetsFiles.avatar],
              userId,
            })
          : Promise.resolve([]),
        assetsFiles.images?.length > 0
          ? uploadAssetsToStorage({
              type: "image",
              files: assetsFiles.images,
              userId,
            })
          : Promise.resolve([]),
        assetsFiles.stories?.length > 0
          ? uploadAssetsToStorage({
              type: "story",
              files: assetsFiles.stories,
              userId,
            })
          : Promise.resolve([]),
      ]);

      await deleteAssetsFromStorage(deletedAssetsFiles);

      setAssetsPreview({
        avatar: null,
        images: [],
        stories: [],
      });

      setAssetsFiles({
        avatar: null,
        images: [],
        stories: [],
      });

      const readyMockup: Mockup = {
        ...mockup,
        avatar: avatarUrl[0] || mockup.avatar,
        images: [...(mockup.images || []), ...newImageUrls],
        stories: [...(mockup.stories || []), ...newStoryObjects],
        id: uuid,
        user_id: userId,
      };

      setMockup(readyMockup);
      await saveMockup(readyMockup);
      toast.success("Mockup saved successfully.", { id: toastId });
      router.push(`/dashboard/mockup-studio/${uuid}`);
    } catch {
      toast.error("Failed to save mockup.", { id: toastId });
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarContentMockupStudio
          setMockup={setMockup}
          mockup={mockup}
          mockupData={mockupData}
          mockupsData={mockupsData}
        />
      </Sidebar>

      <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
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
            <div className="ml-2">
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
                      <span className="font-semibold">
                        {millify(mockup.posts)}
                      </span>
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
                <span className="text-muted-foreground italic">
                  Profile type
                </span>
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
                                    const updatedLinks = mockup.links.map(
                                      (l) =>
                                        l.id === link.id
                                          ? { ...l, url: trimmed }
                                          : l,
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

        <Toolbar save={handleSave} />
      </div>
    </>
  );
};

export default Studio;
