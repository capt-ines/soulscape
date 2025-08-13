import { createClient as createServerClient } from "@/utils/supabase/server";

export const getUserData = async (userId) => {
  const supabase = await createServerClient();

  if (!userId) return null;

  const { data: mockups, error: mockupsFetchingError } = await supabase
    .from("mockups")
    .select("*")
    .eq("user_id", userId);

  if (mockupsFetchingError) {
    console.error("Fetch error:", mockupsFetchingError);
    return null;
  }

  // const { data: soulscapes, error: soulscapesFetchngError } = await supabase
  //   .from("soulscapes")
  //   .select("*")
  //   .eq("user_id", userId);

  if (
    mockupsFetchingError
    // || soulscapesFetchngError
  ) {
    console.error(
      "Fetch error:",
      mockupsFetchingError,
      //  || soulscapesFetchngError,
    );
    return null;
  }

  const userData = {
    mockups: mockups || [],
    // soulscapes: soulscapes || [],
    // journals: [],
  };
  return userData;
};
