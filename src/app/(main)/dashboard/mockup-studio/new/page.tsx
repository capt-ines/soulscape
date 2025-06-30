import { Sidebar } from "@/components/Sidebar";
import Studio from "@/components/Studio";
import { createClient } from "@/utils/supabase/server";

const MockupStudio = async () => {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  return (
    <div className="my-19 sm:my-23">
      <Studio user={user} />
      <Sidebar />
    </div>
  );
};

export default MockupStudio;
