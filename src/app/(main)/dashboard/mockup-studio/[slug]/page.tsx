import React from "react";

import { Sidebar } from "@/components/Sidebar";
import Studio from "@/components/Studio";

//TODO: generateStaticPaths for SSG

const MockupStudio = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <>
      {/* TODO: suspense */}
      <Studio mockupId={slug} />
      <Sidebar />
    </>
  );
};

export default MockupStudio;
