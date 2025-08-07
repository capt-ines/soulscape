import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { TbReplace } from "react-icons/tb";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AssetEditButton from "./AssetEditButton";

const StoryCard = ({ story, index, deleteStory, isPreview }) => {
  return (
    <Popover>
      <PopoverTrigger disabled={isPreview}>
        <div className="hover:bg-muted flex w-18 cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-2 transition duration-300">
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
      </PopoverTrigger>

      <PopoverContent
        align="center"
        sideOffset={-88}
        className="flex w-[70px] flex-col gap-7 border-none bg-transparent p-0 pt-1 shadow-none inset-shadow-none"
      >
        <AnimatePresence>
          <motion.div
            className="flex justify-end"
            initial={{ x: 10 }}
            animate={{ x: 0 }}
            exit={{ x: 10 }}
            transition={{ duration: 0.1 }}
          >
            <AssetEditButton variant="delete" action={deleteStory} />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            exit={{ y: 10 }}
            transition={{ duration: 0.1 }}
          >
            <Input defaultValue={story.title} className="droplet h-8 text-xs" />
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

export default StoryCard;
