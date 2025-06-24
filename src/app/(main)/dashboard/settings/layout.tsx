import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-18">{children}</div>;
};

export default Layout;
