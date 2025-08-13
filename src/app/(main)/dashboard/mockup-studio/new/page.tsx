import { auth } from "@clerk/nextjs/server";

import LoadingLogo from "@/components/LoadingLogo";
import Studio from "@/components/mockup-studio/Studio";
import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

const MockupStudio = async () => {
  const { userId } = await auth();
  const userData = await getUserData(userId);
  const mockupsData = userData?.mockups || [];

  return (
    <div className="my-19 sm:my-23">
      <Studio mockupsData={mockupsData} />
    </div>
  );
};

export default MockupStudio;
