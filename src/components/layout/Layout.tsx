import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import MouseLight from "../ui/MouseLight";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background">
      <div className="mx-6">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
