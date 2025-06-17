"use client";
import { Button } from "./ui/button";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import { motion } from "framer-motion";
// import { useUser } from "@/contexts/userContext";

const HeroSection = () => {
  const [isClicked, setIsClicked] = useState(false);
  //   const router = useRouter();
  //   const { user } = useUser();

  //   const handlePingAndRedirect = (url: string) => {
  //     setIsClicked(true);

  //     setTimeout(() => {
  //       router.push(url);
  //     }, 1000);
  //   };

  return (
    <>
      <motion.div
        animate={isClicked ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute h-screen w-screen transition-colors duration-2000 ${isClicked ? "bg-global-background z-100" : "bg-accent -z-50"}`}
      ></motion.div>

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
            className={`glow absolute inset-0 z-0 rounded-full bg-white mix-blend-plus-lighter transition duration-1000 ease-out ${isClicked ? "bg-foreground/30 scale-155" : "group-hover:scale-110"}`}
          ></div>

          {/* 🌀 Main content layer */}
          <div
            className={`relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-white px-5 transition duration-1000 ease-out sm:px-10 ${isClicked ? "bg-foreground/30 scale-150" : "group-hover:scale-105"}`}
          >
            <div className="relative z-20 flex flex-col items-center text-center">
              <h1
                className={`text-xl transition duration-1000 min-[400px]:text-2xl min-[480px]:text-3xl ${
                  isClicked ? "text-transparent" : "text-accent"
                }`}
              >
                Illuminate your soul’s path.
              </h1>
              <p
                className={`min-[400px]:text-md mt-2 text-sm transition duration-1000 min-[480px]:text-lg ${
                  isClicked ? "text-transparent" : "text-accent"
                }`}
              >
                A powerful set of tools to navigate it with clarity and craft
                with purpose.
              </p>

              <Button
                variant={"secondary"}
                // onClick={() =>
                //   handlePingAndRedirect(user ? "/explore" : "/register")
                // }
                onClick={() => setIsClicked(true)}
                className={`bg-accent hover:bg-accent/90 absolute mt-6 translate-y-16 text-xs text-white transition hover:scale-105 min-[400px]:translate-y-20 min-[480px]:translate-y-24 sm:text-sm ${
                  isClicked
                    ? "bg-transparent text-transparent duration-1000"
                    : "duration-500"
                }`}
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
