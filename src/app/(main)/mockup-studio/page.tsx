import React from "react";

import BottomToolbar from "@/components/BottomToolbar";
import Studio from "@/components/Studio";
import Toolbar from "@/components/Toolbar";

const MockupStudio = () => {
  return (
    <>
      <Toolbar>
        <Studio />
      </Toolbar>
      <BottomToolbar />
    </>
  );
};

export default MockupStudio;
