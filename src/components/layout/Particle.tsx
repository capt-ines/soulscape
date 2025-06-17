"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { getRandomRGBColor } from "@/lib/getRandomRGBColor";
import { useEffect, useRef, useState } from "react";
import { getRandomOne } from "@/lib/getRandomOne";
import { getRandomInt } from "@/lib/getRandomInt";
import { getRandomFloat } from "@/lib/getRandomFloat";

type ParticleProps = {
  speed?: number;
  center?: { x: number; y: number };
  color?: string;
  size?: string;
  direction?: "clockwise" | "counterclockwise";
};

export default function Particle({
  speed,
  direction,
  center,
  color,
  size,
}: ParticleProps) {
  const radius = 200;
  const angle = useMotionValue(0);
  const ref = useRef(null);

  const [initialValues, setInitialValues] = useState<{
    constX: number;
    constY: number;
    sizeConst: number;
    speedConst: number;
    directionConst: number;
    colorConst: string;
  } | null>(null);

  useEffect(() => {
    const getCenterConst = () => {
      return { x: getRandomInt(100, 800), y: getRandomInt(100, 800) };
    };

    const directionConst =
      direction === "clockwise"
        ? 1
        : direction === "counterclockwise"
          ? -1
          : getRandomOne(); // assuming this returns 1 or -1

    const speedConst = speed ?? getRandomFloat(0.02, 0.07);
    const centerVal = center ?? getCenterConst();
    const sizeConst = size ? parseInt(size) : getRandomInt(400, 800);
    const colorConst = color ?? getRandomRGBColor();

    setInitialValues({
      constX: centerVal.x,
      constY: centerVal.y,
      sizeConst,
      speedConst,
      directionConst,
      colorConst,
    });
  }, [center, color, direction, size, speed]);

  useAnimationFrame((t) => {
    if (!initialValues) return;
    const angleInRadians =
      (t / 1000) *
      initialValues.speedConst *
      2 *
      Math.PI *
      initialValues.directionConst;
    angle.set(angleInRadians);
  });

  const x = useTransform(
    angle,
    (a) => initialValues?.constX + radius * Math.cos(a)
  );
  const y = useTransform(
    angle,
    (a) => initialValues?.constY + radius * Math.sin(a)
  );

  if (!initialValues) return null; // or loading fallback

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        backgroundColor: initialValues.colorConst,
        width: initialValues.sizeConst,
      }}
      className="absolute aspect-square rounded-full mix-blend-color-dodge"
    />
  );
}
