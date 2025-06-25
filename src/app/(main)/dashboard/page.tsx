"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useUserStore } from "@/store/userStore";
import type { Mockup } from "@/types/Mockups";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  //fetch all mockups for user   select all where user_id: "user.id",
  const supabase = createClient();
  const user = useUserStore((s) => s.user);
  const [mockups, setMockups] = useState<Mockup[]>([]);

  const fetchMockups = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("mockups")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      console.error("Fetch error", error);
      return;
    }

    setMockups(data || []);
  };

  useEffect(() => {
    fetchMockups();
  }, [user, supabase]);

  useEffect(() => {
    console.log(mockups);
  }, [mockups]);

  if (!supabase) return;
  return (
    <div>
      <h1>Dashboard:)</h1>
      <ul>
        mockups list:
        {mockups.map((mockup, index) => (
          <li key={index}>
            <Link href={`/dashboard/mockup-studio/${mockup.id}`}>
              {mockup.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
