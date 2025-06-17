import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background/50 border-foreground/20 flex justify-between gap-4 border-t px-10 pt-7 pb-20 text-sm sm:items-end sm:justify-start">
      <span translate="no" className="link text-foreground">
        © {new Date().getFullYear()} Soulscape
      </span>
      <span className="link text-foreground">Privacy & terms</span>
    </footer>
  );
};

export default Footer;
