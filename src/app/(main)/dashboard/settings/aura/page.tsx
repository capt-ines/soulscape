"use client";
import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

import ArrowButton from "@/components/ArrowButton";
import { themesData } from "@/constants/themes";

const Aura = () => {
  const { theme, setTheme } = useTheme();
  const themeObject = themesData.find((t) => t.key === theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const index = themesData.findIndex((t) => t.key === themeObject?.key);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [themeObject]);

  useEffect(() => {
    if (document.documentElement.className === "light") {
      setTheme("indigoChild");
    }
    if (document.documentElement.className === "dark") {
      setTheme("seeker");
    }
  }, []);

  const nextTheme = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % themesData.length;
      const newTheme = themesData[newIndex].key;
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
      setTheme(newTheme);
      return newIndex;
    });
  };

  const prevTheme = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + themesData.length) % themesData.length;
      const newTheme = themesData[newIndex].key;
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
      setTheme(newTheme);
      return newIndex;
    });
  };

  const handleSwatchClick = (t: {
    key: string;
    label: string;
    swatch: string;
  }) => {
    const newTheme = t.key;
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    setTheme(newTheme);
  };

  useEffect(() => {
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
  }, [currentIndex]);

  return (
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
              className={`${themeObject?.key === t.key ? `scale-130 hover:scale-126` : ``} flex cursor-pointer items-center gap-2 px-5 py-1 whitespace-nowrap transition-transform duration-300 hover:scale-120`}
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
          <ArrowButton className="m-4" onClick={nextTheme} direction="right" />
        </div>
        <h2 className="mb-3 hidden text-3xl md:mt-5 md:block">
          {themeObject?.label}
        </h2>
      </div>
    </section>
  );
};

export default Aura;
