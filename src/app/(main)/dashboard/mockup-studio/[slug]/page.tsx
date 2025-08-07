import { Suspense } from "react";

import LoadingLogo from "@/components/LoadingLogo";
import Studio from "@/components/mockup-studio/Studio";
import { MockupData, MockupType } from "@/types/MockupType";
import { createClient } from "@/utils/supabase/server";

type MockupStudioProps = {
  params: Promise<{ slug: string }>;
};

const MockupStudio = async ({ params }: MockupStudioProps) => {
  const { slug } = await params;
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  const { data: mockupsData, error: mockupError } = await supabase
    .from("mockups")
    .select("*")
    .eq("user_id", user?.id);

  if (mockupError) {
    console.error("Error fetching mockup:", mockupError.message);
    return (
      <div className="h-screen">
        <LoadingLogo />
      </div>
    );
  }

  const mockupData: MockupData = mockupsData.find((m) => m.id === slug);

  return (
    <div className="my-19 sm:my-23">
      <Studio mockupsData={mockupsData} user={user} mockupData={mockupData} />
    </div>
  );
};

export default MockupStudio;
