import { DashboardPanel } from "@/components/Dashboard";
import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserData(user);

  return (
    <section className="mx-4 my-19 flex flex-col justify-between sm:mx-12 sm:my-23 sm:flex-row sm:gap-30">
      <span className="mb-5 text-center sm:hidden">{user?.email}</span>
      <DashboardPanel userData={userData} />
    </section>
  );
}
