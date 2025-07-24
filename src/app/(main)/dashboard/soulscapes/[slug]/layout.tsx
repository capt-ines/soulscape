export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-8 my-20">{children}</div>;
}
