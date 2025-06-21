import { create } from "zustand";

import { themesData } from "@/constants/themes";
import type { Theme, ThemeState } from "@/types/Themes";

function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}`;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: null,
  storedThemes: themesData,

  setTheme: (theme: Theme) => {
    set((state) => {
      if (typeof window === "undefined") return state;
      setCookie("theme", `${theme.key} ${theme.type}`);

      const newTheme = state.storedThemes.find((t) => t.key === theme.key);
      return newTheme ? { currentTheme: newTheme } : state;
    });
  },

  getThemeFromCookie: () => {
    if (typeof window === "undefined") return;

    const stored = getCookie("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const fallback = prefersDark
      ? themesData.find((t) => t.key === "seeker")
      : themesData.find((t) => t.key === "indigoChild");

    if (stored) {
      const key = stored.split(" ")[0];
      const theme = themesData.find((t) => t.key === key);
      if (theme) {
        set({ currentTheme: theme });
        return;
      }
    }

    if (fallback) {
      setCookie("theme", `${fallback.key} ${fallback.type}`);
      document.documentElement.classList.toggle(
        "dark",
        fallback.type === "dark",
      );
      set({ currentTheme: fallback });
    }
  },
}));
