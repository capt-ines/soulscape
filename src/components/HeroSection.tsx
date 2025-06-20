"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const HeroSection = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const user = false;

  const handlePingAndRedirect = (url: string) => {
    setIsClicked(true);
    setTimeout(() => {
      router.push(url);
    }, 1000);
  };

  return (
    <>
      <motion.div
        animate={isClicked ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn(
          "absolute h-screen w-screen transition-colors duration-2000",
          isClicked ? "bg-mask z-50" : "bg-primary -z-50",
        )}
      />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex h-screen items-center justify-center"
      >
        {/* Group wrapper for stacking + hover effects */}
        <div className="group relative aspect-square w-full max-w-md">
          {/* ✨ Glow layer, reacts to group hover */}
          <div
            style={{ willChange: "transform" }}
            className={cn(
              "glow absolute inset-0 z-0 rounded-full bg-white mix-blend-plus-lighter transition duration-1000 ease-out",
              isClicked
                ? "bg-foreground/30 scale-155"
                : "group-hover:scale-110",
            )}
          ></div>

          {/* 🌀 Main content layer */}
          <div
            className={cn(
              "relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-white px-5 transition duration-1000 ease-out sm:px-10",
              isClicked
                ? "bg-foreground/30 scale-150"
                : "group-hover:scale-105",
            )}
          >
            <div className="relative z-20 flex flex-col items-center text-center">
              <h1
                className={`text-xl transition duration-1000 min-[400px]:text-2xl min-[480px]:text-3xl ${
                  isClicked ? "text-transparent" : "text-primary"
                }`}
              >
                Illuminate your soul’s path.
              </h1>
              <p
                className={cn(
                  "min-[400px]:text-md mt-2 text-sm transition duration-1000 min-[480px]:text-lg",
                  isClicked ? "text-transparent" : "text-primary",
                )}
              >
                A powerful set of tools to navigate it with clarity and craft
                with purpose.
              </p>

              <Button
                variant={"secondary"}
                onClick={() =>
                  handlePingAndRedirect(user ? "/explore" : "/register")
                }
                className={cn(
                  "bg-primary hover:bg-primary/90 absolute mt-6 translate-y-16 text-xs text-white transition hover:scale-105 min-[400px]:translate-y-20 min-[480px]:translate-y-24 sm:text-sm",
                  isClicked
                    ? "bg-transparent text-transparent duration-1000"
                    : "duration-500",
                )}
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HeroSection;
