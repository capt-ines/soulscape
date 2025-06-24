import React from "react";

const NavAddition = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="fixed top-5 z-20 flex items-center justify-center">
          <div className="w-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default NavAddition;
