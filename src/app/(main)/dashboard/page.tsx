import { DashboardPanel } from "@/components/Dashboard";
import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserData(user);

  return <DashboardPanel user={user} userData={userData} />;
}
