import React from "react";

import BottomToolbar from "@/components/BottomToolbar";
import Studio from "@/components/Studio";
import Toolbar from "@/components/Toolbar";

const MockupStudio = () => {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Toolbar>
          <Studio />
        </Toolbar>
      </div>

      <BottomToolbar />
    </>
  );
};

export default MockupStudio;
