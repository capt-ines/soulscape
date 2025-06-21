"use client";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider } from "next-themes";

function ThemesProvider({ children, ...props }: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}

export default ThemesProvider;
