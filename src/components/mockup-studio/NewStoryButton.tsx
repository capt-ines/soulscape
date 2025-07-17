import React from "react";
import { IoAdd } from "react-icons/io5";

const NewStoryButton = ({ onChange }) => {
  return (
    <div className="flex w-18 flex-col items-center gap-1 py-2">
      <label>
        <div className="hover:bg-muted hover:text-muted-foreground flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border-2 transition duration-300">
          <IoAdd size={18} />
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={onChange}
        />
      </label>
      <div className="w-16 overflow-hidden text-center whitespace-nowrap">
        <span className="block truncate">New story</span>
      </div>
    </div>
  );
};

export default NewStoryButton;
