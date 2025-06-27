import React from "react";
import { PiSpiralFill } from "react-icons/pi";

export const Footer = () => {
  return (
    <footer
      suppressHydrationWarning
      className="bg-background/50 border-foreground/20"
    >
      <div className="flex justify-between gap-4 border-t px-10 pt-7 pb-20 text-sm sm:items-end sm:justify-center">
        <span translate="no" className="link text-foreground">
          © {new Date().getFullYear()} Soulscape
        </span>
        <span className="link text-foreground">Privacy & terms</span>
      </div>
    </footer>
  );
};
