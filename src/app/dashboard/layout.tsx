export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-8 pt-22 md:mx-13 md:pt-24">{children}</div>;
}
