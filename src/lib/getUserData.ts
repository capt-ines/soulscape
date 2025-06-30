import { User } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";

export const getUserData = async (user: User) => {
  const supabase = await createClient();

  if (!user) return null;

  const { data: mockups, error: mockupsFetchingError } = await supabase
    .from("mockups")
    .select("*")
    .eq("user_id", user.id);

  if (mockupsFetchingError) {
    console.error("Fetch error:", mockupsFetchingError);
    return null;
  }

  console.log("Mockups fetched");
  const userData = {
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username || "Anonymous",
    mockups: mockups || [],
    journals: [],
  };
  return userData;
};
