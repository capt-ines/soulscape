export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen sm:mt-0 md:mx-13">
      {children}
      <div className="blur-gradient-top fixed bottom-0 left-0 z-11 h-15 w-full bg-transparent" />
    </div>
  );
}
