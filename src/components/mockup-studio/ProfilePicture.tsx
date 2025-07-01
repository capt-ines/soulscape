import React from "react";
import { IoAdd } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Mockup } from "@/types/Mockups";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ProfilePicture = ({
  url,
  uploadPicture,
  size,
}: {
  url: string;
  uploadPicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: string;
}) => {
  return (
    <Avatar className={size}>
      <label
        className={cn(
          size,
          "hover:bg-accent/30 absolute rounded-full transition duration-200 hover:cursor-pointer",
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            uploadPicture(e);
          }}
        />
      </label>
      <AvatarImage src={url || ""} />
      <AvatarFallback>
        <div
          className={cn(
            size,
            "bg-card flex items-center rounded-full border-2",
          )}
        >
          <IoAdd className="w-full" size={"26"} />
        </div>
      </AvatarFallback>
    </Avatar>
  );
};
