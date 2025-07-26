import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { IoAdd } from "react-icons/io5";

import AssetEditButton from "./AssetEditButton";

export const ProfilePicture = ({ onChange, src, deleteProfilePicture }) => {
  return !src ? (
    <label>
      <div className="hover:bg-muted hover:text-muted-foreground mt-0.5 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300">
        <IoAdd size={18} />
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e, "avatar")}
      />
    </label>
  ) : (
    <Popover>
      <PopoverTrigger>
        <div className="group relative mt-0.5 h-16 w-16 cursor-pointer rounded-full">
          <div className="group-hover:bg-muted/30 absolute z-50 h-full w-full rounded-full transition duration-300" />
          <Image
            src={src}
            alt="profile picture"
            fill
            sizes="(width: 64px, height: 64px)"
            className="rounded-full object-cover"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={-70}
        className="flex w-[80px] flex-col gap-6 border-none bg-transparent p-0 pt-1 shadow-none inset-shadow-none"
      >
        <AnimatePresence>
          <div className="flex justify-between">
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              exit={{ x: -10 }}
              transition={{ duration: 0.1 }}
            >
              <AssetEditButton variant="replace" action={onChange} />
            </motion.div>

            <motion.div
              initial={{ x: 10 }}
              animate={{ x: 0 }}
              exit={{ x: 10 }}
              transition={{ duration: 0.1 }}
            >
              <AssetEditButton variant="delete" action={deleteProfilePicture} />
            </motion.div>
          </div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};
