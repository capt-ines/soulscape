import { AnimatePresence, motion } from "framer-motion";
import millify from "millify";
import Image from "next/image";
import { IoAdd, IoLink, IoPersonAddOutline, IoRemove } from "react-icons/io5";
import { PiGridNineFill, PiTag, PiVideo } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type MockupType } from "@/types/MockupType";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ImageCard from "./ImageCard";
import NewImageButton from "./NewImageButton";
import NewStoryButton from "./NewStoryButton";
import NumericInput from "./NumericInput";
import { ProfilePicture } from "./ProfilePicture";
import StoryCard from "./StoryCard";

type MockupProps = {
  type: "editable" | "preview";
  presentMockup: MockupType;
  mockupRef?: React.RefObject<HTMLDivElement | null>;
  setMockup?: React.Dispatch<MockupType>;
  handleFileChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "image" | "story",
  ) => void;
  deleteAsset?: (
    type: "stories" | "images" | "avatar",
    index?: number,
    isPreview?: boolean,
  ) => void;
};

export const Mockup = ({
  type,
  presentMockup,
  mockupRef,
  handleFileChange,
  deleteAsset,
  setMockup,
}: MockupProps) => {
  return (
    <Card
      ref={mockupRef}
      className={cn(
        type === `editable`
          ? `outline-primary shadow-primary shadow-lg`
          : `outline-transparent`,
        `transition-color flex h-[540px] w-[295px] flex-col gap-2 overflow-x-hidden overflow-y-auto p-3 text-sm outline-3 duration-600 sm:h-[600px]`,
      )}
    >
      <Popover>
        <PopoverTrigger
          disabled={type === "preview" && true}
          className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-lg font-extrabold transition duration-200"
        >
          <span>@{presentMockup.mockup.username}</span>
        </PopoverTrigger>
        <PopoverContent className="w-70" variant="droplet">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="posts">@username</Label>
              <Input
                defaultValue={presentMockup.mockup.username}
                onBlur={(e) => {
                  if (e.target.value.trim() !== "") {
                    setMockup({
                      ...presentMockup,
                      mockup: {
                        ...presentMockup.mockup,
                        username: e.target.value,
                      },
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
            isPreview={type === "preview" && true}
            deleteProfilePicture={() => deleteAsset("avatar")}
            src={
              presentMockup.assetsPreview.avatar || presentMockup.mockup.avatar
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, "avatar")
            }
          />
        </div>

        <div className="flex flex-col justify-center gap-0">
          <Popover>
            <PopoverTrigger
              disabled={type === "preview" && true}
              className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 text-left text-xs font-bold transition duration-200"
            >
              {presentMockup.mockup.name ? (
                <span>{presentMockup.mockup.name}</span>
              ) : (
                type === "editable" && (
                  <span className="text-muted-foreground italic">Name</span>
                )
              )}
            </PopoverTrigger>
            <PopoverContent variant="droplet" className="w-70">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="posts">Name</Label>
                  <Input
                    defaultValue={presentMockup.mockup.name}
                    onBlur={(e) => {
                      setMockup({
                        ...presentMockup,
                        mockup: {
                          ...presentMockup.mockup,
                          name: e.target.value,
                        },
                      });
                    }}
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger
              disabled={type === "preview" && true}
              className="hover:bg-accent cursor-pointer rounded-md px-2 py-1 transition duration-200"
            >
              <div className="flex flex-3 items-center justify-between gap-4">
                <div className="flex flex-col text-left">
                  <span className="font-bold">
                    {millify(presentMockup.mockup.posts)}
                  </span>
                  <span className="text-xs">Posts</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold">
                    {millify(presentMockup.mockup.followers)}
                  </span>
                  <span className="text-xs">Followers</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold">
                    {millify(presentMockup.mockup.following)}
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
                      presentMockup={presentMockup}
                      id={"posts"}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="followers">Followers</Label>
                    <NumericInput
                      setMockup={setMockup}
                      presentMockup={presentMockup}
                      id={"followers"}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="following">Following</Label>
                    <NumericInput
                      setMockup={setMockup}
                      presentMockup={presentMockup}
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
        <PopoverTrigger
          disabled={type === "preview" && true}
          className="hover:bg-accent flex cursor-pointer flex-col rounded-md px-2 text-left transition duration-200"
        >
          {presentMockup.mockup.type ? (
            <span className="text-muted-foreground">
              {presentMockup.mockup.type}
            </span>
          ) : (
            type === "editable" && (
              <span className="text-muted-foreground italic">Profile type</span>
            )
          )}

          {presentMockup.mockup.bio ? (
            <span>{presentMockup.mockup.bio}</span>
          ) : (
            type === "editable" && (
              <span className="text-muted-foreground italic">Bio</span>
            )
          )}

          {presentMockup.mockup.links.length
            ? presentMockup.mockup.links.map((link) => (
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
            : type === "editable" && (
                <div className="text-muted-foreground flex items-center gap-0.5 italic">
                  <div className="w-3">
                    <IoLink size={12} className="rotate-45" />
                  </div>
                  <span>Links</span>
                </div>
              )}
        </PopoverTrigger>

        <PopoverContent
          sideOffset={-20 * presentMockup.mockup.links?.length + 20}
          variant="droplet"
          className="w-70"
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="type">Type</Label>
                <Input
                  maxLength={30}
                  defaultValue={presentMockup.mockup.type || ""}
                  onBlur={(e) => {
                    setMockup({
                      ...presentMockup,
                      mockup: {
                        ...presentMockup.mockup,
                        type: e.target.value,
                      },
                    });
                  }}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  defaultValue={presentMockup.mockup.bio}
                  onBlur={(e) => {
                    setMockup({
                      ...presentMockup,
                      mockup: {
                        ...presentMockup.mockup,
                        bio: e.target.value,
                      },
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
                    {presentMockup.mockup.links?.map((link) => {
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
                                const updatedLinks =
                                  presentMockup.mockup.links.filter(
                                    (l) => l.id !== link.id,
                                  );
                                setMockup({
                                  ...presentMockup,
                                  mockup: {
                                    ...presentMockup.mockup,
                                    links: updatedLinks,
                                  },
                                });
                              } else {
                                const updatedLinks =
                                  presentMockup.mockup.links.map((l) =>
                                    l.id === link.id
                                      ? { ...l, url: trimmed }
                                      : l,
                                  );
                                setMockup({
                                  ...presentMockup,
                                  mockup: {
                                    ...presentMockup.mockup,
                                    links: updatedLinks,
                                  },
                                });
                              }
                            }}
                            className="h-8 text-indigo-500 dark:text-indigo-400"
                          />
                          <Button
                            onClick={() => {
                              const updatedLinks =
                                presentMockup.mockup.links?.filter(
                                  (l) => l.id !== link.id,
                                );
                              setMockup({
                                ...presentMockup,
                                mockup: {
                                  ...presentMockup.mockup,
                                  links: updatedLinks,
                                },
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
                      disabled={presentMockup.mockup.links?.length >= 5}
                      variant={"droplet"}
                      onClick={() =>
                        setMockup({
                          ...presentMockup,
                          mockup: {
                            ...presentMockup.mockup,
                            links: [
                              ...presentMockup.mockup.links,
                              { id: uuidv4(), url: "click.me" },
                            ],
                          },
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
        <NewStoryButton
          isPreview={type === "preview" && true}
          onChange={(e) => handleFileChange(e, "story")}
        />
        <div className="flex overflow-x-auto">
          {presentMockup.mockup.stories?.map((story, index: number) => (
            <StoryCard
              isPreview={type === "preview" && true}
              story={story}
              index={index}
              key={index}
              deleteStory={() => deleteAsset("stories", index, false)}
            />
          ))}
          {presentMockup.assetsPreview.stories?.map((story, index: number) => (
            <StoryCard
              isPreview={type === "preview" && true}
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
        {type === "editable" && (
          <NewImageButton onChange={(e) => handleFileChange(e, "image")} />
        )}
        {presentMockup.mockup.images?.map((image, index) => (
          <ImageCard
            isPreview={type === "preview" && true}
            image={image}
            index={index}
            key={index}
            deleteImage={() => deleteAsset("images", index, false)}
          />
        ))}

        {presentMockup.assetsPreview.images?.map((image, index) => (
          <ImageCard
            isPreview={type === "preview" && true}
            image={image}
            index={index}
            key={index}
            deleteImage={() => deleteAsset("images", index, true)}
          />
        ))}
      </div>
    </Card>
  );
};
