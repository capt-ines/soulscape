import { BsGrid3X3, BsUpload } from "react-icons/bs";
import { GrOfflineStorage, GrUpload } from "react-icons/gr";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import {
  IoArchiveOutline,
  IoBookmarkOutline,
  IoJournalOutline,
  IoPhoneLandscape,
  IoPhoneLandscapeOutline,
} from "react-icons/io5";
import { PiButterflyLight, PiGear } from "react-icons/pi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { TbGrid4X4 } from "react-icons/tb";

export const soulscapesMenuItems = [
  {
    key: "mockups",
    icon: <IoPhoneLandscapeOutline className="rotate-90" size={18} />,
  },
  { key: "journals", icon: <IoJournalOutline size={18} /> },
  { key: "upload", icon: <BsUpload size={18} /> },
  { key: "affirmations", icon: <IoBookmarkOutline size={18} /> },
  { key: "saved", icon: <HiOutlineArchiveBox size={18} /> },
];
