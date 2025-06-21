"use client";

import { useEffect } from "react";

import { useThemeStore } from "@/app/store/themeStore";
import MouseLight from "@/components/layout/MouseLight";
import Particle from "@/components/layout/Particle";
import { randomize } from "@/utils/randoms";

export function ThemeManager() {
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const getThemeFromCookie = useThemeStore((s) => s.getThemeFromCookie);

  useEffect(() => {
    if (!currentTheme) return;
    if (currentTheme.key === "seeker" || currentTheme.key === "indigoChild") {
      document.documentElement.className = "";
    } else {
      document.documentElement.className = currentTheme.key;
    }
    document.documentElement.classList.toggle(
      "dark",
      currentTheme.type === "dark",
    );
  }, [currentTheme]);

  useEffect(() => {
    getThemeFromCookie();
  }, [getThemeFromCookie]);

  if (!currentTheme) return null;
  const currentPalette = currentTheme.palette;
  const hasPalette = currentPalette.length > 1;

  return (
    <div className="absolute top-0 left-0 -z-40 h-screen w-screen overflow-hidden blur-3xl">
      <MouseLight />
      <div className="bg-mask/30 dark:bg-mask/50 pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />
      <div className="absolute -z-30 h-screen w-screen bg-transparent backdrop-blur-3xl" />
      {currentPalette && (
        <>
          <Particle
            {...(hasPalette && {
              color: randomize(currentPalette),
            })}
            center={{ x: 100, y: 100 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(currentPalette),
            })}
            center={{ x: 100, y: 100 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(currentPalette),
            })}
            center={{ x: 800, y: 400 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(currentPalette),
            })}
            center={{ x: 200, y: 100 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(currentPalette),
            })}
          />
        </>
      )}
    </div>
  );
}
