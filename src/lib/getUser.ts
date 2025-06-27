import { createClient } from "@/utils/supabase/server";

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log(userError.message);
    return;
  }

  return user;
};
