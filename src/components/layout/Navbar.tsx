//   import { useUser } from "@/contexts/userContext";
//   import { signOut } from "@/utils/auth/signOut";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { CiSettings } from "react-icons/ci";
import { GrNext } from "react-icons/gr";
import {
  IoCompass,
  IoCompassOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { PiDoorOpenThin } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "../../constants/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const color = isIndex ? "white" : "foreground";
  //   const colorVariants = {
  //     white: "text-white/60 ",
  //     foreground: "text-foreground/60 ",
  //   };
  //   const { user, username } = useUser();
  //   const router = useRouter();
  const navLinks =
    pathname === "/" ? publicNavLinksData : dashboardNavLinksData;

  return (
    <nav>
      <ul className={`mx-auto flex w-full gap-8`}>
        {navLinks.map((link) => (
          <li
            key={link.href}
            className={`hover:text-accent transition duration-400 hover:scale-102 ${pathname.includes(link.href) ? `text-white` : ``} `}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      {/* {user ? ( */}
      <div className="absolute top-9 right-13">
        <div className="flex items-center font-semibold">
          <Link
            className="hover:text-accent px-1 transition duration-400 hover:scale-102"
            href="/explore"
          >
            <IoHeartOutline />
          </Link>
          <Link
            className="hover:text-accent px-1 transition duration-400 hover:scale-102"
            href="/explore"
          >
            <IoCompassOutline />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-accent ml-3 flex cursor-pointer items-center gap-2 transition duration-400 hover:scale-102">
              {/* {username} */}
              <GrNext className="size-3 rotate-90" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-content min-w-36">
              <DropdownMenuItem className="items-end">
                <Link className="flex gap-2" href="/dashboard">
                  <span>My profile</span>
                  <div className="bg-accent h-5 w-5 rounded-full"></div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <div className="flex items-center gap-2">
                    <Link className="w-full" href="/dashboard/settings">
                      <span>Settings</span>
                    </Link>
                    <CiSettings className="text-foreground size-5"></CiSettings>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="min-w-36">
                    <DropdownMenuItem className="items-end">
                      <Link
                        className="w-full text-right"
                        href="/dashboard/settings/details"
                      >
                        Profile details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="items-end">
                      <Link
                        className="w-full text-right"
                        href="/dashboard/settings/aura"
                      >
                        Aura
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="items-end">
                      More...
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="items-end">
                <div
                  // onClick={() => signOut(router)}
                  className="flex items-center gap-2"
                >
                  <span>Sign out</span>
                  <PiDoorOpenThin className="size-5"></PiDoorOpenThin>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* ) : (
        <div className="absolute top-9 right-13 transition duration-400 hover:scale-110">
          <Link href="/login">Sign in</Link>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
