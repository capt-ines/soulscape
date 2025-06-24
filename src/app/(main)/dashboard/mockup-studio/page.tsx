import React from "react";

import ArrowButton from "@/components/ArrowButton";
import NavAddition from "@/components/NavAddition";
import Sidebar from "@/components/Sidebar";
import Studio from "@/components/Studio";
import Toolbar from "@/components/Toolbar";

const MockupStudio = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
        <Studio />
        <Toolbar />
      </div>
      <Sidebar />
    </>
  );
};

export default MockupStudio;
