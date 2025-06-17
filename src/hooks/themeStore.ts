import { create } from "zustand";
import { themesData } from "@/constants/themes";

export const useThemeStore = create((set) => {
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
