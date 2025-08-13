import clsx from "clsx";

import { DashboardPanel } from "@/components/Dashboard";
import DashboardCard from "@/components/DashboardCard";
import { DashboardCardContent } from "@/components/DashboardCardContent";
import DashboardNavigation from "@/components/DashboardNavigation";
import RadialMenu from "@/components/RadialMenu";
import { Card } from "@/components/ui/card";
import { dashboardMenuItems } from "@/constants/dashboardMenuItems";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-4 my-19 flex flex-col justify-between sm:mx-12 sm:my-23 sm:flex-row sm:gap-30">
      <DashboardNavigation />

      <Card
        variant="flat"
        className="min-h-[calc(100vh-262px)] w-full justify-start gap-0 rounded-xl px-2 py-3 sm:h-[calc(100vh-184px)] sm:overflow-y-auto sm:p-4"
      >
        {children}
      </Card>
    </section>
  );
}
