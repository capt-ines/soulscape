import { User } from "@supabase/supabase-js";

import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

export const GET = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const userData = await getUserData(user);
  return new Response(JSON.stringify(userData), { status: 200 });
};
