import { redirect } from "next/navigation";

export const goBack = () => {
  redirect("/");
};
