import type { User as SupabaseUser } from "@supabase/supabase-js";
import { create } from "zustand";

type User = SupabaseUser | null;

export const useUserStore = create<{
  user: User;
  setUser: (user: User) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
