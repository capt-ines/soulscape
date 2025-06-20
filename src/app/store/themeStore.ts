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

    setThemeByKey: (key: string) =>
      set((state) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", key);
        }

        const theme = state.storedThemes.find((t) => t.key === key);
        return theme ? { currentTheme: theme } : {};
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
        const theme = themesData.find((t) => t.key === storedTheme);
        set({ currentTheme: theme ?? fallbackTheme });
      } else {
        set({ currentTheme: fallbackTheme });
      }
    },
  };
});
