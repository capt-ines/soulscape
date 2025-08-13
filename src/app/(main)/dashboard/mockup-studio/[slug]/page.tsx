import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import LoadingLogo from "@/components/LoadingLogo";
import Studio from "@/components/mockup-studio/Studio";
import { getUserData } from "@/lib/getUserData";
import { MockupData, MockupType } from "@/types/MockupType";
import { createClient } from "@/utils/supabase/server";

type MockupStudioProps = {
  params: Promise<{ slug: string }>;
};

const MockupStudio = async ({ params }: MockupStudioProps) => {
  const { slug } = await params;
  const { userId } = await auth();
  const userData = await getUserData(userId);
  const mockupsData = userData?.mockups || [];

  const mockupData: MockupData = mockupsData.find((m) => m.id === slug);

  return (
    <div className="my-19 sm:my-23">
      <Studio mockupsData={mockupsData} mockupData={mockupData} />
    </div>
  );
};

export default MockupStudio;
