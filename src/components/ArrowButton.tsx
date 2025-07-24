import clsx from "clsx";
import React from "react";
import { GrNext } from "react-icons/gr";

const ArrowButton = ({
  onClick,
  text,
  className,
  direction = "up",
}: {
  onClick?: () => void;
  direction?: string;
  className?: string;
  text?: string;
}) => {
  return (
    <button
      className="hover:text-muted-foreground/70 text-muted-foreground/60 min-h-5 min-w-5 cursor-pointer transition duration-300 hover:scale-102 active:scale-105"
      onClick={onClick}
    >
      <div className="flex aspect-square items-center justify-center gap-1">
        {direction === "right" && <span>{text}</span>}
        {direction === "bottom" && <span>{text}</span>}

        <GrNext
          className={clsx(
            direction === "right" && "",
            direction === "left" && "-rotate-180",
            direction === "down" && "rotate-90",
            direction === "up" && "-rotate-90",
            className,
          )}
        />
        {text && direction === "left" && <span>{text}</span>}
        {text && direction === "top" && <span>{text}</span>}
      </div>
    </button>
  );
};

export default ArrowButton;
