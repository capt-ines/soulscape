import { User } from "@supabase/supabase-js";

import { createClient } from "@/utils/supabase/server";

export const getSingleData = async (user, table, id) => {
  const supabase = await createClient();

  if (!user) return null;

  const { data, error: fetchingError } = await supabase
    .from(table)
    .select()
    .match({ id })
    .single();

  if (fetchingError) {
    console.error("Fetch error:", fetchingError);
    return null;
  }

  console.log("Data fetched");
  return data;
};
