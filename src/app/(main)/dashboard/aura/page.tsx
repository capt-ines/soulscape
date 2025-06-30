"use client";
import clsx from "clsx";
import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

import ArrowButton from "@/components/ArrowButton";
import NavAddition from "@/components/NavAddition";
import { Skeleton } from "@/components/ui/skeleton";
import { themesData } from "@/constants/themes";
import { Theme } from "@/types/Themes";

const Aura = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeObject = themesData.find((t) => t.key === theme);

  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const currentIndex = themesData.findIndex((t) => t.key === theme);

  const nextTheme = () => {
    const newIndex = (currentIndex + 1) % themesData.length;
    setTheme(themesData[newIndex].key);
  };

  const prevTheme = () => {
    const newIndex = (currentIndex - 1 + themesData.length) % themesData.length;
    setTheme(themesData[newIndex].key);
  };

  const handleSwatchClick = (t: Theme) => {
    const newTheme = t.key;
    setTheme(newTheme);
  };

  useEffect(() => {
    if (!theme) return;
    if (listRef.current && itemRefs.current[currentIndex]) {
      const selectedItem = itemRefs.current[currentIndex];
      const container = listRef.current;

      const containerRect = container.getBoundingClientRect();
      const itemRect = selectedItem?.getBoundingClientRect();

      if (itemRect) {
        const offset =
          itemRect.top -
          containerRect.top -
          container.clientHeight / 2 +
          itemRect.height / 2;
        container.scrollBy({ top: offset, behavior: "smooth" });
      }
    }
  }, [currentIndex, mounted, theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <div className="flex flex-col">
      <NavAddition>
        <Link className=" " href={"./"}>
          <ArrowButton className="" direction="left" text="Back to settings" />
        </Link>
      </NavAddition>

      <section className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:gap-2 lg:my-5 lg:gap-20 2xl:gap-30">
        <div className="flex flex-col items-center gap-1">
          <ArrowButton
            className="m-4"
            onClick={() => {
              if (listRef.current) {
                listRef.current.scrollBy({
                  top: -32,
                  behavior: "smooth",
                });
              }
            }}
            direction="up"
          />

          <ul
            ref={listRef}
            className="no-scroll flex h-36 flex-col items-end overflow-x-hidden overflow-y-scroll scroll-smooth md:h-96"
          >
            {themesData.map((t, index) => (
              <li
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleSwatchClick(t)}
                key={t.key}
                className={`${t.key === themeObject?.key ? `scale-130 hover:scale-126` : ``} flex cursor-pointer items-center gap-2 px-5 py-1 whitespace-nowrap transition-transform duration-300 hover:scale-120`}
              >
                {t.label}
                <div
                  className={`${t.key === `seeker` || t.key === `indigoChild` ? `animate-rainbow` : null}`}
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: t.swatch,
                  }}
                ></div>
              </li>
            ))}
          </ul>

          <ArrowButton
            className="m-4"
            onClick={() => {
              if (listRef.current) {
                listRef.current.scrollBy({
                  top: 32,
                  behavior: "smooth",
                });
              }
            }}
            direction="down"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <div className="md:mb-5">
            <h1>Choose your aura.</h1>
            <span className="text-xs sm:text-sm">
              You can change it later in your profile settings.
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-16 lg:gap-10">
            <ArrowButton className="m-4" onClick={prevTheme} direction="left" />

            <div
              style={{ willChange: "transform" }}
              className={clsx(
                "aspect-square",
                "min-w-36",
                "md:w-64",
                "blur-lg",
                "lg:w-72",
                "rounded-full",
                "mx-auto",
                "bg-white",
                "mix-blend-plus-lighter",
                "transition",
                "duration-1000",
                "ease-out",
                "glow hover:biggerglow",
              )}
            />
            <ArrowButton
              className="m-4"
              onClick={nextTheme}
              direction="right"
            />
          </div>
          <h2 className="mb-3 hidden text-3xl md:mt-5 md:block">
            {themeObject ? themeObject.label : ""}
          </h2>
        </div>
      </section>
    </div>
  ) : (
    <div className="flex flex-col">
      <NavAddition>
        <Link className=" " href={"./"}>
          <ArrowButton className="" direction="left" text="Back to settings" />
        </Link>
      </NavAddition>
      <section className="flex flex-col-reverse items-center justify-center gap-5 md:flex-row md:gap-2 lg:my-5 lg:gap-20 2xl:gap-30">
        <div className="flex flex-col items-center gap-1">
          <ArrowButton className="m-4" direction="up" />
          <Skeleton className="no-scroll flex h-36 w-[157px] flex-col items-end overflow-x-hidden overflow-y-scroll scroll-smooth md:h-96" />
          <ArrowButton className="m-4" direction="down" />
        </div>

        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <div className="md:mb-5">
            <Skeleton className="mx-auto h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-72" />
          </div>

          <div className="flex items-center gap-1 sm:gap-16 lg:gap-10">
            <ArrowButton className="m-4" direction="left" />
            <Skeleton className="mx-auto aspect-square min-w-36 rounded-full transition duration-1000 ease-out md:w-64 lg:w-72" />
            <ArrowButton className="m-4" direction="right" />
          </div>

          <Skeleton className="mb-3 hidden h-8 w-48 md:mt-5 md:block" />
        </div>
      </section>
    </div>
  );
};

export default Aura;
