//   import { useUser } from "@/contexts/userContext";
//   import { signOut } from "@/utils/auth/signOut";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCompassOutline, IoHeartOutline } from "react-icons/io5";

import {
  dashboardNavLinksData,
  publicNavLinksData,
} from "../../constants/navigation";
import DropdownUserMenu from "../DropdownUserMenu";

const Navbar = () => {
  const pathname = usePathname();
  const user = true;
  const navLinks =
    pathname === "/" || !user ? publicNavLinksData : dashboardNavLinksData;

  return (
    <nav>
      <ul className={`mx-auto flex w-full gap-8`}>
        {navLinks.map((link) => (
          <li
            key={link.href}
            className={`hover:text-primary transition duration-400 hover:scale-102 ${pathname.includes(link.href) ? `text-white` : ``} `}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      {user ? (
        <div className="absolute top-9 right-13">
          <div className="flex items-center font-semibold">
            <Link
              aria-label="Saved ideas"
              className="hover:text-primary px-1 transition duration-400 hover:scale-102"
              href="/savedIdeas"
            >
              <IoHeartOutline size={"20"} />
            </Link>
            <Link
              aria-label="Explore"
              className="hover:text-primary px-1 transition duration-400 hover:scale-102"
              href="/explore"
            >
              <IoCompassOutline size={"20"} />
            </Link>
            <DropdownUserMenu />
          </div>
        </div>
      ) : (
        <div className="hover:text-primary absolute top-9 right-13 transition duration-400 hover:scale-102">
          <Link href="/login">Sign in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
