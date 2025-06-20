export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-8 min-h-screen py-25 md:mx-13">{children}</div>;
}
