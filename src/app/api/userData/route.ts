import { auth } from "@clerk/nextjs/server";

import { getUserData } from "@/lib/getUserData";

export const GET = async () => {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const userData = await getUserData(userId);
  return new Response(JSON.stringify(userData), { status: 200 });
};
