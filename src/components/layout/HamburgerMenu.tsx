import { dashboardHamburgerLinksData } from "@/constants/navigation";
// import { useUser } from "@/contexts/userContext";
import { ArrowUpIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DotTypes {
  isOpen: boolean;
  isBig?: boolean;
  backgroundColor: string;
}

const Dot = ({ backgroundColor, isOpen, isBig = false }: DotTypes) => (
  <motion.div
    animate={isOpen ? { backgroundColor: "var(--background)" } : {}}
    transition={{ duration: 0.05 }}
    initial={{ backgroundColor: backgroundColor }}
    className={`h-1 w-1 transform rounded-full transition duration-800 ease-in-out ${
      isBig
        ? isOpen
          ? `scale-[70000%]`
          : `scale-[100%] group-hover:scale-[120%]`
        : isOpen
          ? `scale-[900%]`
          : `scale-[100%] group-hover:scale-[120%]`
    }`}
  />
);

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  //   const { user, username } = useUser();
  const isIndex = pathname === "/";
  const backgroundColor = isIndex
    ? "var(--color-white)"
    : "var(--color-foreground)";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinks =
    // pathname.startsWith("/dashboard")
    //   ?
    dashboardHamburgerLinksData.map((link) => (
      <li key={link.href} className="transition duration-400 hover:scale-110">
        <Link onClick={toggleMenu} href={link.href}>
          {link.label}
        </Link>
      </li>
    ));
  // : publicNavLinksData.map((link) => (
  //     <li key={link.href} className="transition duration-400 hover:scale-110">
  //       <Link onClick={toggleMenu} href={link.href}>
  //         {link.label}
  //       </Link>
  //     </li>
  //   ));

  return (
    <nav className="fixed top-7 right-8 z-50 md:top-6.5 md:right-13">
      <button
        onClick={toggleMenu}
        className="group -my-4.5 -mr-6 flex cursor-pointer flex-col items-center gap-1 p-6"
      >
        <div className="flex gap-1">
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
        </div>
        <div className="flex gap-1">
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} isBig={true} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
        </div>
        <div className="flex gap-1">
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
        </div>
      </button>
      <div
        className={`text-foreground absolute top-10 right-2 z-52 flex flex-col items-end gap-3 text-right transition duration-600 ease-in-out min-[580px]:right-10 min-[580px]:gap-4 min-[580px]:text-2xl md:right-8 ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
      >
        <button onClick={toggleMenu} className="cursor-pointer pb-3 pl-6">
          <ArrowUpIcon className="scale-220 rotate-45" />
        </button>
        <ul
          className={`flex flex-col gap-8 text-right text-3xl transition duration-600 ease-in-out min-[580px]:right-40 min-[580px]:gap-10 min-[580px]:text-4xl ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
        >
          {/* {user ? (
            <li className="pt-3 pb-2 font-serif transition duration-400 hover:scale-110">
              <Link onClick={toggleMenu} href="/dashboard">
                {username}
              </Link>
            </li>
          ) : ( */}
          <li className="transition duration-400 hover:scale-110">
            <Link onClick={toggleMenu} href="/login">
              Sign in
            </Link>
          </li>
          {/* )} */}
          {navLinks}
        </ul>
      </div>
    </nav>
  );
};

export default HamburgerMenu;
