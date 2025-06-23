// NavbarSkeleton.tsx
import { IoCompassOutline, IoHeartOutline } from "react-icons/io5";

import { Skeleton } from "@/components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <nav className="w-full">
      <ul className="mx-auto flex w-full gap-8">
        {[...Array(4)].map((_, i) => (
          <li key={i}>
            <Skeleton className="h-4 w-20" />
          </li>
        ))}
      </ul>

      <div className="absolute top-9 right-13 flex items-center gap-2">
        {/* Icons */}
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
        {/* Dropdown */}
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </nav>
  );
};

export default NavbarSkeleton;
