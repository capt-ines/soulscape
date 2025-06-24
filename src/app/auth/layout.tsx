export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-8 flex min-h-screen items-center py-25 md:mx-13">
      {children}
    </div>
  );
}
