"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { IoAdd } from "react-icons/io5";

import DashboardCard from "@/components/DashboardCard";
import { DashboardCardContent } from "@/components/DashboardCardContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const All = () => {
  return (
    <motion.div
      key="all"
      initial={{ opacity: 0, filter: "blur(2px)" }}
      animate={{
        opacity: 3,
        filter: "blur(0px)",
        transition: { duration: 0.3 },
      }}
    >
      <motion.span
        // key={activeCategory}
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{
          opacity: 3,
          filter: "blur(0px)",
          transition: { duration: 0.3 },
        }}
        className="mx-2 mt-2 mb-3 font-serif text-xl"
      >
        all
      </motion.span>
      <p className="mx-2 mt-2">All</p>
    </motion.div>
  );
};

export default All;
