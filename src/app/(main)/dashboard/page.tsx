"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useUserDataStore } from "@/store/userDataStore";
import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  const user = useUserStore((s) => s.user);
  const userData = useUserDataStore((s) => s.userData);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (!userData) return; //some loading screen;
  return (
    <div>
      <h1>Hi, {user?.email} :)</h1>
      <ul>
        mockups list:
        {userData?.mockups.map((mockup, index) => (
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
