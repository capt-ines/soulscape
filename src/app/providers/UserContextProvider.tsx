"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import useSWR from "swr";

import { createClient } from "@/utils/supabase/client";

const UserContext = createContext<User | null>(null);

const fetchUser = async (): Promise<User | null> => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
};

export function UserContextProvider({
  children,
  user: initialUser,
}: {
  children: React.ReactNode;
  user?: User | null;
}) {
  const { data: user } = useSWR("supabase-session", fetchUser, {
    fallbackData: initialUser ?? null,
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
