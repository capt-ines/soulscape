import {
  IoBookmarkOutline,
  IoJournalOutline,
  IoPhoneLandscapeOutline,
} from "react-icons/io5";
import { PiButterflyLight, PiGear } from "react-icons/pi";
import { TbGrid4X4 } from "react-icons/tb";

export const dashboardMenuItems = [
  { key: "all", icon: <TbGrid4X4 size={18} /> },
  {
    key: "mockups",
    icon: <IoPhoneLandscapeOutline className="rotate-90" size={18} />,
  },
  { key: "journals", icon: <IoJournalOutline size={18} /> },
  { key: "affirmations", icon: <IoBookmarkOutline size={18} /> },
  { key: "soulscapes", icon: <PiButterflyLight size={20} /> },
  { key: "settings", icon: <PiGear size={20} /> },
];
