import React from "react";
import { IoAdd } from "react-icons/io5";

const NewImageButton = ({ onChange }) => {
  return (
    <label>
      <div className="bg-muted text-muted-foreground col-span-1 flex h-32 cursor-pointer items-center justify-center transition duration-200 hover:bg-white/10">
        <IoAdd size={20} />
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={onChange}
      />
    </label>
  );
};

export default NewImageButton;
