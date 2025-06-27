import Link from "next/link";
import { PiSpiralFill } from "react-icons/pi";

import { cn } from "@/lib/utils";

export const NavLogo = ({ className }: { className: string }) => {
  return (
    <Link className={cn(className, "p-6")} href={"/"}>
      <div className="flex items-center gap-0.5">
        <h1 translate="no" className={`hidden text-lg md:block`}>
          soulscape
        </h1>
        <PiSpiralFill
          size={20}
          className={`animate-quickspin my-1 scale-130 md:my-0 md:scale-100`}
        />
      </div>
    </Link>
  );
};
