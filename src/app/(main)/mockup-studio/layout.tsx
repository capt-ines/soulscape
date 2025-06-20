export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-3 min-h-screen py-21 md:mx-13">{children}</div>;
}
