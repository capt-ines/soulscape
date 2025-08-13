import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const DashboardCard = ({
  // activeCategory,
  children,
}: {
  // activeCategory: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(64px)",
        opacity: 1,
        transition: { duration: 2 },
      }}
      className="min-h-[calc(100vh-262px)] w-full justify-start gap-0 rounded-xl px-2 py-3 sm:h-[calc(100vh-184px)] sm:overflow-y-auto sm:p-4"
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
        {/* {activeCategory} */}
      </motion.span>
      {/* <AnimatePresence> */}
      {children}
      {/* </AnimatePresence> */}
    </motion.div>
  );
};

export default DashboardCard;
