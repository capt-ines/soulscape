import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import AssetEditButton from "./AssetEditButton";

const ImageCard = ({ image, index, replaceImage, deleteImage }) => {
  return (
    <Popover key={index}>
      <PopoverTrigger>
        <div className="group bg-background relative col-span-1 h-32">
          <div className="group-hover:bg-muted/30 absolute z-50 h-full w-full cursor-pointer transition duration-300" />
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            fill
            className="cursor-pointer object-cover"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={-140}
        className="z-50 flex w-[110px] flex-col gap-6 border-none bg-transparent p-0 pt-1 shadow-none inset-shadow-none"
      >
        <AnimatePresence>
          <div className="flex justify-between">
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              exit={{ x: -10 }}
              transition={{ duration: 0.1 }}
            >
              <AssetEditButton
                variant="replace"
                action={replaceImage}
                args="story"
              />
            </motion.div>

            <motion.div
              initial={{ x: 10 }}
              animate={{ x: 0 }}
              exit={{ x: 10 }}
              transition={{ duration: 0.1 }}
            >
              <AssetEditButton variant="delete" action={deleteImage} />
            </motion.div>
          </div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

export default ImageCard;
