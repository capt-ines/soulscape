"use client";

import { useTheme } from "next-themes";

import MouseLight from "@/components/layout/MouseLight";
import Particle from "@/components/layout/Particle";
import { themesData } from "@/constants/themes";
import { randomize } from "@/utils/randoms";

export function ThemeManager() {
  const { theme } = useTheme();
  const themeObject = themesData.find((t) => t.key === theme);
  let palette: string[];
  if (!themeObject) {
    palette = [];
  } else {
    palette = themeObject?.palette;
  }
  const hasPalette = palette.length > 1;

  return (
    <div className="absolute top-0 left-0 -z-40 h-screen w-screen overflow-hidden blur-3xl">
      <MouseLight />
      <div className="bg-mask/30 dark:bg-mask/50 pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />
      <div className="absolute -z-30 h-screen w-screen bg-transparent backdrop-blur-3xl" />
      {palette && (
        <>
          <Particle
            {...(hasPalette && {
              color: randomize(palette),
            })}
            center={{ x: 100, y: 100 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(palette),
            })}
            center={{ x: 100, y: 100 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(palette),
            })}
            center={{ x: 800, y: 400 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(palette),
            })}
            center={{ x: 200, y: 100 }}
          />
          <Particle
            {...(hasPalette && {
              color: randomize(palette),
            })}
          />
        </>
      )}
    </div>
  );
}
