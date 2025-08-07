import React from "react";

import LoadingLogo from "@/components/LoadingLogo";
import { Soulscape } from "@/components/soulscapes/Soulscape";
import { getUserData } from "@/lib/getUserData";
import { createClient } from "@/utils/supabase/server";

type SoulscapesPageProps = {
  params: { slug: string };
};

export default async function SoulscapesPage({
  params: { slug },
}: SoulscapesPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fetchedUserData = await getUserData(user);
  const userData = { mockups: fetchedUserData?.mockups };

  const { data: soulscapesData, error: soulscapeError } = await supabase
    .from("soulscapes")
    .select("*")
    .eq("user_id", user?.id);

  if (soulscapeError) {
    console.error("Error fetching soulscape:", soulscapeError.message);
    return (
      <div className="h-screen">
        <LoadingLogo />
      </div>
    );
  }

  const soulscapeData = soulscapesData.find((m) => m.id === slug);

  return (
    <Soulscape user={user} userData={userData} soulscapeData={soulscapeData} />
  );
}
