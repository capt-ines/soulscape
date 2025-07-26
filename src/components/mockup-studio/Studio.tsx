"use client";

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
import { type MockupType } from "@/types/MockupType";
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
import { Mockup } from "./Mockup";
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
  const [isPreview, setIsPreview] = useState(false);

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

  const [
    mockupState,
    {
      set: setMockupState,
      reset: resetMockupState,
      undo: undoMockup,
      redo: redoMockup,
      canUndo,
      canRedo,
    },
  ] = useUndo({ mockup, assetsPreview });
  const { present: presentMockup } = mockupState;

  useEffect(() => {
    setMockupState({ mockup: mockup, assetsPreview: assetsPreview });
  }, [mockup, assetsPreview]);

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

  const saveMockup = async (readyMockup: MockupType) => {
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

      const readyMockup: MockupType = {
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

  const mockupRef = useRef<HTMLDivElement>(null);

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
        <Mockup
          mockupRef={mockupRef}
          type={isPreview ? "preview" : "editable"}
          setMockup={setMockup}
          handleFileChange={handleFileChange}
          deleteAsset={deleteAsset}
          mockup={presentMockup.mockup}
          assetsPreview={presentMockup.assetsPreview}
        />
        <Toolbar
          mockupRef={mockupRef}
          undo={undoMockup}
          redo={redoMockup}
          save={handleSave}
          setIsPreview={setIsPreview}
          isPreview={isPreview}
        />
      </div>
    </>
  );
};

export default Studio;
