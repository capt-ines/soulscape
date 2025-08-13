import {
  IoBookmarkOutline,
  IoJournalOutline,
  IoPhoneLandscapeOutline,
} from "react-icons/io5";
import { PiButterflyLight, PiGear } from "react-icons/pi";
import { TbGrid4X4 } from "react-icons/tb";

export const dashboardMenuItems = [
  {
    key: "all",
    href: "/dashboard/all",
    type: "link",
    icon: <TbGrid4X4 size={18} />,
  },
  {
    key: "mockups",
    href: "/dashboard/mockups",
    type: "link",
    icon: <IoPhoneLandscapeOutline className="rotate-90" size={18} />,
  },
  {
    key: "journals",
    href: "/dashboard/journals",
    type: "link",
    icon: <IoJournalOutline size={18} />,
  },
  {
    key: "affirmations",
    href: "/dashboard/affirmations",
    type: "link",
    icon: <IoBookmarkOutline size={18} />,
  },
  {
    key: "soulscapes",
    href: "/dashboard/soulscapes",
    type: "link",
    icon: <PiButterflyLight size={20} />,
  },
  {
    key: "settings",
    href: "/dashboard/settings",
    type: "link",
    icon: <PiGear size={20} />,
  },
];
