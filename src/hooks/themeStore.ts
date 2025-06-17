import { create } from "zustand";
import { themesData } from "@/constants/themes";

export const useThemeStore = create((set) => {
  const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? themesData.find((theme) => theme.key === "seeker")
    : themesData.find((theme) => theme.key === "indigoChild");

  return {
    currentTheme: initialTheme,
    storedThemes: themesData,
    setThemeByKey: (key) =>
      set((state) => {
        const theme = state.storedThemes.find((t) => t.key === key);
        localStorage.setItem("theme", key);
        return theme ? { currentTheme: theme } : {};
      }),
    getThemeFromLocalStorage: () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        const theme = themesData.find((t) => t.key === storedTheme);
        if (theme) {
          set({ currentTheme: theme });
        } else {
          set({ currentTheme: initialTheme });
        }
      } else {
        set({ currentTheme: initialTheme });
      }
    },
  };
});
