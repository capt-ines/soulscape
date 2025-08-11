import clsx from "clsx";

import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <>
      <div
        className={clsx("blur-gradient absolute top-0 z-30 h-[100px] w-full")}
      />
      <header
        className={clsx("fixed top-0 z-40 h-24 w-full px-2 sm:px-6 sm:py-3")}
      >
        <Navbar />
      </header>
    </>
  );
};
