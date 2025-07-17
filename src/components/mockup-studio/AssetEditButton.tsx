import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { TbReplace } from "react-icons/tb";

type AssetEditButtonProps = {
  variant: "delete" | "replace";
  action: (event?: React.ChangeEvent<HTMLInputElement>, args?: unknown) => void;
  args?: unknown;
};

const AssetEditButton: React.FC<AssetEditButtonProps> = ({
  variant,
  action,
  args,
}) => {
  if (variant === "delete") {
    return (
      <button
        onClick={() => action()}
        className="droplet text-button-foreground flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:scale-110"
      >
        <AiOutlineDelete />
      </button>
    );
  } else if (variant === "replace") {
    return (
      <label>
        <div className="droplet text-button-foreground flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition duration-200 hover:scale-110">
          <TbReplace />
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => action(e, args)}
        />
      </label>
    );
  }
};

export default AssetEditButton;
