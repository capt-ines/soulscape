export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="my-24 min-h-screen">{children}</div>;
}
