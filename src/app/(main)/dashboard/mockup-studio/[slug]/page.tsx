import { getSingleData } from "@/app/getSingleData";
import { Sidebar } from "@/components/Sidebar";
import Studio from "@/components/Studio";
import { getUser } from "@/lib/getUser";

type MockupStudioProps = {
  params: { id: string };
};

const MockupStudio = async ({ params: { id } }: MockupStudioProps) => {
  const user = await getUser();
  const { data: mockupId } = await getSingleData(user, "mockups", id);

  return (
    <>
      <Studio mockupId={mockupId} />
      <Sidebar />
    </>
  );
};

export default MockupStudio;
