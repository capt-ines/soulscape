"use client";

import { useUser } from "@clerk/nextjs";
import { User } from "@supabase/supabase-js";
import { toPng } from "html-to-image";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { isErrored } from "stream";
import useSWR from "swr";
import useUndo from "use-undo";
import { v4 as uuidv4 } from "uuid";

import { createNewMockupTemplate } from "@/constants/NewMockupTemplate";
import { fetcher } from "@/lib/fetcher";
import { MockupData, type MockupType } from "@/types/MockupType";
import { getStoragePathFromPublicUrl } from "@/utils/getStoragePathFromPublicUrl";
import { createClient } from "@/utils/supabase/client";

import LoadingLogo from "../LoadingLogo";
import { Sidebar } from "../Sidebar";
import Toolbar from "../Toolbar";
import { deleteAssetsFromStorage } from "./deleteAssetsFromStorage";
import { Mockup } from "./Mockup";
import { SidebarContentMockupStudio } from "./SidebarContentMockupStudio";

type StudioProps = {
  mockupsData: MockupData[];
  mockupData: MockupData;
};

const Studio = ({ mockupsData, mockupData }: StudioProps) => {
  const supabase = createClient();

  const { user } = useUser();

  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);

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

  const mockup: MockupType = {
    mockup: mockupData,
    assetsPreview: { avatar: null, images: [], stories: [] },
  };
  const initialMockup = mockupData ? mockup : createNewMockupTemplate();

  const [
    mockupState,
    {
      set: setMockupState,
      undo: undoMockup,
      redo: redoMockup,
      canUndo,
      canRedo,
    },
  ] = useUndo(initialMockup);

  const { present: presentMockup } = mockupState;

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
    const currentMockup = presentMockup.mockup;
    const currentAssetsPreview = presentMockup.assetsPreview;

    if (type === "avatar") {
      if (currentMockup.avatar) {
        const assetPath = getStoragePathFromPublicUrl(currentMockup.avatar);
        setDeletedAssetsFiles((prev) => ({
          ...prev,
          avatar: assetPath,
        }));

        setMockupState({
          ...presentMockup,
          mockup: { ...presentMockup.mockup, avatar: null },
        });
      } else {
        setMockupState({
          ...presentMockup,
          assetsPreview: { ...presentMockup.assetsPreview, avatar: null },
        });

        setAssetsFiles((prev) => ({
          ...prev,
          avatar: null,
        }));
      }
      return;
    }

    if (isPreview) {
      const updatedPreviews = [...currentAssetsPreview[type]];
      updatedPreviews.splice(index!, 1);

      setMockupState({
        ...presentMockup,
        assetsPreview: {
          ...presentMockup.assetsPreview,
          [type]: updatedPreviews,
        },
      });

      const updatedFiles = [...assetsFiles[type]];
      updatedFiles.splice(index!, 1);
      setAssetsFiles((prev) => ({
        ...prev,
        [type]: updatedFiles,
      }));
    } else {
      const updated = [...currentMockup[type]];
      const [removedItem] = updated.splice(index!, 1);

      const pathToDelete =
        type === "stories"
          ? getStoragePathFromPublicUrl(removedItem?.url)
          : getStoragePathFromPublicUrl(removedItem);

      setDeletedAssetsFiles((prev) => {
        const existing = prev[type] || [];
        return {
          ...prev,
          [type]: [...existing, pathToDelete],
        };
      });

      setMockupState({
        ...presentMockup,
        mockup: {
          ...presentMockup.mockup,
          [type]: updated,
        },
      });
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
        type === "avatar"
          ? files[0]
          : [
              ...(prev[type === "image" ? "images" : "stories"] || []),
              ...files,
            ],
    }));

    const currentAssetsPreview = presentMockup.assetsPreview;

    setMockupState({
      ...presentMockup,
      assetsPreview: {
        ...presentMockup.assetsPreview,
        [type === "avatar"
          ? "avatar"
          : type === "image"
            ? "images"
            : "stories"]:
          type === "avatar"
            ? previews[0]
            : type === "image"
              ? [...(currentAssetsPreview.images || []), ...previews]
              : [
                  ...(currentAssetsPreview.stories || []),
                  ...previews.map((url) => ({ url, title: "New story" })),
                ],
      },
    });
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

    const currentMockup = presentMockup.mockup;

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

      setAssetsFiles({
        avatar: null,
        images: [],
        stories: [],
      });
      setDeletedAssetsFiles({
        avatar: "",
        images: [],
        stories: [],
      });

      const readyMockup: MockupType = {
        ...currentMockup,
        avatar: avatarUrl[0] || currentMockup.avatar,
        images: [...(currentMockup.images || []), ...newImageUrls],
        stories: [...(currentMockup.stories || []), ...newStoryObjects],
        id: uuid,
        user_id: userId,
      };

      setMockupState({
        mockup: readyMockup,
        assetsPreview: {
          avatar: null,
          images: [],
          stories: [],
        },
      });

      await saveMockup(readyMockup);
      toast.success("Mockup saved successfully.", { id: toastId });

      router.push(`/dashboard/mockup-studio/${uuid}`);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save mockup.", { id: toastId });
    }
  };

  const mockupRef = useRef<HTMLDivElement>(null);

  const downloadComponentAsImage = async () => {
    await handleSave();
    setIsPreview(true);

    requestAnimationFrame(() => {
      if (!mockupRef.current) return;
      console.log(mockupRef.current);
      toPng(mockupRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-component.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to generate PNG", err);
        });
    });
  };

  if (!presentMockup) return;
  return (
    <>
      <Sidebar>
        <SidebarContentMockupStudio
          setMockup={setMockupState}
          mockup={presentMockup.mockup}
          mockupsData={mockupsData}
        />
      </Sidebar>
      <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
        <Mockup
          mockupRef={mockupRef}
          type={isPreview ? "preview" : "editable"}
          setMockup={setMockupState}
          handleFileChange={handleFileChange}
          deleteAsset={deleteAsset}
          presentMockup={presentMockup}
        />

        <Toolbar
          downloadComponentAsImage={downloadComponentAsImage}
          canUndo={canUndo}
          canRedo={canRedo}
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
