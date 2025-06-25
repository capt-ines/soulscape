"use client";

import { useEffect } from "react";

import { useUserDataStore } from "@/store/userDataStore";
import { useUserStore } from "@/store/userStore";
import type { UserData } from "@/types/UserData";
import { createClient } from "@/utils/supabase/client";

export const UserDataProvider = () => {
  const supabase = createClient();
  const user = useUserStore((s) => s.user);
  const setUserData = useUserDataStore((s) => s.setUserData);
  const userData = useUserDataStore((s) => s.userData);

  const fetchUserData = async () => {
    if (!user) return;
    const { data: mockups, error: mockupsFetchingError } = await supabase
      .from("mockups")
      .select("*")
      .eq("user_id", user?.id);

    // const { data: journals, error: journalFetchingError } = await supabase
    //   .from("journals")
    //   .select("*")
    //   .eq("user_id", user?.id);

    const error = mockupsFetchingError;
    // || journalFetchingError;

    if (error) {
      console.error("Fetch error", error);
    }
    console.log("data fetched");
    setUserData({ ...userData, mockups } as UserData);
  };

  useEffect(() => {
    fetchUserData();
  }, [user, supabase]);

  return null;
};
