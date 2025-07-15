import { themesData } from "@/constants/themes";

import { randomize } from "./randoms";

const currentBrowserTheme = document.documentElement.classList?.[0] || "";

const currentThemeData = themesData.find((t) => t.key === currentBrowserTheme);
const palette = currentThemeData?.palette || [];

export const randomColorFromPalette = () => randomize(palette);
