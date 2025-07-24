import React from "react";

import { Soulscape } from "@/components/soulscapes/Soulscape";
import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

export default async function SoulscapesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserData(user);

  return <Soulscape userData={userData} />;
}
