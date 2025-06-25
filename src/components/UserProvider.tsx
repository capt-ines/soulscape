"use client";

import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useEffect } from "react";

import { useUserStore } from "@/store/userStore";

type User = SupabaseUser | null;

const UserProvider = ({ initialUser }: { initialUser: User }) => {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  return null;
};

export default UserProvider;
