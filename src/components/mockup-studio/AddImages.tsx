import React from "react";
import { IoAdd } from "react-icons/io5";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddImages = ({ handleUpload }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-muted text-muted-foreground col-span-1 flex h-32 cursor-pointer items-center justify-center transition duration-200 hover:bg-white/10">
          <IoAdd size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-70" variant="droplet">
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="posts">Posts</Label>
            <div className="col-span-3">
              <p className="text-muted-foreground text-sm">
                Create a single post
              </p>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="h-8"
              />
            </div>
            <div className="col-span-3">
              <p className="text-muted-foreground text-sm">
                Or upload multiple pictures
              </p>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddImages;
