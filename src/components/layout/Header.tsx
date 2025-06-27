import clsx from "clsx";

import { getUser } from "@/lib/getUser";

import Navbar from "./Navbar";

const Header = async () => {
  const user = await getUser();

  console.log(user);

  return (
    <>
      <div
        className={clsx("blur-gradient absolute top-0 z-20 h-[100px] w-full")}
      />
      <header
        className={clsx("fixed top-0 z-[30] h-24 w-full px-2 sm:px-6 sm:py-3")}
      >
        <Navbar />
      </header>
    </>
  );
};

export default Header;
