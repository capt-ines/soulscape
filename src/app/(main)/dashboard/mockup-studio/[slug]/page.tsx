import React from "react";

import Sidebar from "@/components/Sidebar";
import Studio from "@/components/Studio";
import Toolbar from "@/components/Toolbar";

const MockupStudio = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <>
      <div className="flex w-full items-center justify-center gap-0.5 sm:translate-x-[31px]">
        <Studio mockupId={slug} />
        <Toolbar />
      </div>
      <Sidebar />
    </>
  );
};

export default MockupStudio;
