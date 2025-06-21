import { create } from "zustand";

import { Theme, themesData } from "@/constants/themes";

type ThemeState = {
  currentTheme: null | Theme;
  storedThemes: Theme[];
  setThemeByKey: (key: string) => void;
  getThemeFromLocalStorage: () => void;
};

export const useThemeStore = create<ThemeState>((set) => {
  return {
    currentTheme: null,
    storedThemes: themesData,

    setTheme: (theme: Theme) =>
      set((state) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", `${theme?.key} ${theme?.type}`);
        }

        const currTheme = state.storedThemes.find((t) => t.key === theme.key);
        return currTheme ? { currentTheme: currTheme } : {};
      }),

    getThemeFromLocalStorage: () => {
      if (typeof window === "undefined") return;

      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const fallbackTheme = prefersDark
        ? themesData.find((t) => t.key === "seeker")
        : themesData.find((t) => t.key === "indigoChild");

      if (storedTheme) {
        const theme = themesData.find((t) => storedTheme.includes(t.key));
        set({ currentTheme: theme ?? fallbackTheme });
      } else {
        set({ currentTheme: fallbackTheme });
        return;
      }
    },
  };
});
