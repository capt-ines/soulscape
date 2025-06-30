import LoadingLogo from "@/components/LoadingLogo";
import { Sidebar } from "@/components/Sidebar";
import Studio from "@/components/Studio";
import { createClient } from "@/utils/supabase/server";

type MockupStudioProps = {
  params: { id: string };
};

const MockupStudio = async ({ params: { slug } }: MockupStudioProps) => {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  const { data: mockup, error: mockupError } = await supabase
    .from("mockups")
    .select("*")
    .eq("id", slug)
    .eq("user_id", user?.id)
    .single();

  if (mockupError) {
    console.error("Error fetching mockup:", mockupError.message);
    return (
      <div className="h-screen">
        <LoadingLogo />
      </div>
    );
  }

  return (
    <div className="my-19 sm:my-23">
      <Studio user={user} mockup={mockup} />
      <Sidebar />
    </div>
  );
};

export default MockupStudio;
