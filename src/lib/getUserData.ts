import { User } from "@supabase/supabase-js";

import { createClient as createServerClient } from "@/utils/supabase/server";

export const getUserData = async (user: User) => {
  const supabase = await createServerClient();

  if (!user) return null;

  const { data: mockups, error: mockupsFetchingError } = await supabase
    .from("mockups")
    .select("*")
    .eq("user_id", user.id);

  if (mockupsFetchingError) {
    console.error("Fetch error:", mockupsFetchingError);
    return null;
  }

  const { data: soulscapes, error: soulscapesFetchngError } = await supabase
    .from("soulscapes")
    .select("*")
    .eq("user_id", user.id);

  if (mockupsFetchingError || soulscapesFetchngError) {
    console.error(
      "Fetch error:",
      mockupsFetchingError || soulscapesFetchngError,
    );
    return null;
  }

  const userData = {
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username || "Anonymous",
    mockups: mockups || [],
    soulscapes: soulscapes || [],
    journals: [],
  };
  return userData;
};
