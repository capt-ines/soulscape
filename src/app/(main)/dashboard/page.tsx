import clsx from "clsx";

import Toolbar from "@/components/Toolbar";
import { Card } from "@/components/ui/card";
import { getUserData } from "@/lib/getUserData";

import { getUser } from "../../../lib/getUser";

export default async function Dashboard() {
  // const data = await fetch('https://...', { cache: 'force-cache' })
  const user = await getUser();
  const mockups = await getUserData(user);

  return (
    <div className="flex gap-2">
      <Toolbar />
      <Card variant="aero" className="w-full p-3">
        <Card
          className="flex w-full items-center justify-center px-8"
          variant="aero"
        >
          <div
            style={{ willChange: "transform" }}
            className={clsx(
              "aspect-square",
              "w-30",
              "rounded-full",
              "bg-white",
              "mix-blend-plus-lighter",
              "transition",
              "duration-1000",
              "ease-out",
              "glow hover:biggerglow",
            )}
          />
          <h1 className="text-xl">{user?.email}</h1>
        </Card>
        <Card className="w-fit p-4" variant="aero">
          <h2>Mockups</h2>
          <ul>
            {mockups?.map((mockup, index) => (
              <li key={index}>{mockup.username}</li>
            ))}
          </ul>
        </Card>
      </Card>
    </div>
  );
}
