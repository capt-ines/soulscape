"use client";
import { useThemeStore } from "@/hooks/themeStore";
import { useEffect } from "react";
import Particle from "@/components/layout/Particle";
import { randomize } from "./randomize";
import MouseLight from "@/components/layout/MouseLight";

export function ThemeManager() {
  const { currentTheme } = useThemeStore();
  const { getThemeFromLocalStorage } = useThemeStore();
  const currentPalette = currentTheme.palette;

  useEffect(() => {
    const classList = document.body.classList;
    classList.remove(...classList);
    classList.add(currentTheme.type);
    classList.add(currentTheme.key);
  }, [currentTheme]);

  useEffect(() => {
    getThemeFromLocalStorage();
  }, []);

  return (
    <div className="absolute top-0 left-0 -z-40 h-screen w-screen overflow-hidden blur-3xl">
      <MouseLight />
      <div className="bg-mask/30 dark:bg-mask/50 pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />
      <div className="absolute -z-30 h-screen w-screen bg-transparent backdrop-blur-3xl"></div>
      {currentPalette && (
        <>
          <Particle
            {...(currentPalette.length > 1 && {
              color: randomize(currentPalette),
            })}
            center={{ x: 100, y: 100 }}
          />
          <Particle
            {...(currentPalette.length > 1 && {
              color: randomize(currentPalette),
            })}
            center={{ x: 100, y: 100 }}
          />
          <Particle
            {...(currentPalette.length > 1 && {
              color: randomize(currentPalette),
            })}
            center={{ x: 800, y: 400 }}
          />
          <Particle
            {...(currentPalette.length > 1 && {
              color: randomize(currentPalette),
            })}
            center={{ x: 200, y: 100 }}
          />
          <Particle
            {...(currentPalette.length > 1 && {
              color: randomize(currentPalette),
            })}
          />
        </>
      )}
    </div>
  );
}
