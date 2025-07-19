import LoadingLogo from "@/components/LoadingLogo";
import Studio from "@/components/mockup-studio/Studio";
import { createClient } from "@/utils/supabase/server";

const MockupStudio = async () => {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  const { data: mockups, error: mockupsError } = await supabase
    .from("mockups")
    .select("*")
    .eq("user_id", user?.id);

  if (mockupsError) {
    console.error("Error fetching mockups:", mockupsError.message);
    return (
      <div className="h-screen">
        <LoadingLogo />
      </div>
    );
  }

  return (
    <div className="my-19 sm:my-23">
      <Studio mockupsData={mockups} user={user} />
    </div>
  );
};

export default MockupStudio;
