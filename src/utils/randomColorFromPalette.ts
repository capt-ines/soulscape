import { themesData } from "@/constants/themes";

import { randomize } from "./randoms";

// Safe access to theme class name
const currentBrowserTheme = document.documentElement.classList?.[0] || ""; // or parse a specific theme class if needed

const currentThemeData = themesData.find((t) => t.key === currentBrowserTheme);
const palette = currentThemeData?.palette || [];

// Export a function, not a fixed value
export const randomColorFromPalette = () => randomize(palette);
