import React from "react";
import { PiSpiralFill } from "react-icons/pi";

const LoadingLogo = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PiSpiralFill
        size={40}
        className={`text-secondary my-1 scale-130 animate-spin md:my-0 md:scale-100`}
      />
    </div>
  );
};

export default LoadingLogo;
