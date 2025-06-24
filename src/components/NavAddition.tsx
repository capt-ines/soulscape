import React from "react";

const NavAddition = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="fixed top-5 right-0 left-0 z-20 flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default NavAddition;
