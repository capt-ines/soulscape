import { create } from "zustand";

import type { UserData } from "@/types/UserData";

export const useUserDataStore = create<{
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
}>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
}));
