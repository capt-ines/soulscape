import React from "react";

import LoadingLogo from "@/components/LoadingLogo";
import { Soulscape } from "@/components/soulscapes/Soulscape";
import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

export default async function SoulscapesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fetchedUserData = await getUserData(user);
  const userData = { mockups: fetchedUserData?.mockups };

  return <Soulscape user={user} userData={userData} />;
}
