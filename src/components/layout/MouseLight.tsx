"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const MouseLight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //setposition x i y , 2 state

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;
      setPosition({
        x: event.clientX + scrollX,
        y: event.clientY + scrollY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween" }}
      className="absolute z-10 hidden aspect-square w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 mix-blend-plus-lighter shadow-[0_0_5px_#ffffff,0_0_5px_,0_0_150px_var(--glow),0_0_120px_var(--glow)] lg:block"
    />
  );
};

export default MouseLight;
