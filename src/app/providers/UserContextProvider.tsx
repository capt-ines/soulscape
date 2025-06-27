// context/UserContext.tsx
"use client";
import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

const UserContext = createContext<User | null>(null);

export function UserContextProvider({
  children,
  user: initialUser,
}: {
  children: React.ReactNode;
  user: User | null | undefined;
}) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
