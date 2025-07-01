import LoadingLogo from "@/components/LoadingLogo";
import Studio from "@/components/mockup-studio/Studio";
import { Sidebar } from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";

type MockupStudioProps = {
  params: { id: string };
};

const MockupStudio = async ({ params: { slug } }: MockupStudioProps) => {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  const { data: mockups, error: mockupError } = await supabase
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

  const mockup = mockups.find((m) => m.id === slug);

  return (
    <div className="my-19 sm:my-23">
      <Studio mockups={mockups} user={user} mockup={mockup} />
    </div>
  );
};

export default MockupStudio;
