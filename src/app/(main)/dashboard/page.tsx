import { redirect } from "next/navigation";

import { DashboardPanel } from "@/components/Dashboard";

export default async function Dashboard() {
  redirect("/dashboard/all");
}
