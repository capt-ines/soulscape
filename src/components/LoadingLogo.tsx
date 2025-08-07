import React from "react";

const LoadingLogo = () => (
  <div className="flex h-full h-screen w-full items-center justify-center">
    <svg
      className="animate-spin"
      width="100"
      height="100"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" /> {/* from-primary */}
          <stop offset="100%" stopColor="var(--primaryVariant)" />{" "}
          {/* to-gradientbg */}
        </linearGradient>
      </defs>
      <path
        fill="url(#spiral-gradient)"
        d="M248,144a8,8,0,0,1-16,0,96.11,96.11,0,0,0-96-96c-1.4,0-2.8,0-4.18.1A80.06,80.06,0,0,0,56,128a64.07,64.07,0,0,0,64,64,44.05,44.05,0,0,0,44-44,32,32,0,0,0-32-32,8,8,0,0,0,0,16,16,16,0,0,1,16,16,28,28,0,0,1-28,28,48.05,48.05,0,0,1-48-48,64.07,64.07,0,0,1,64-64,80.09,80.09,0,0,1,80,80,88.1,88.1,0,0,1-88,88,96.11,96.11,0,0,1-96-96A104.11,104.11,0,0,1,136,32,112.12,112.12,0,0,1,248,144Z"
      />
    </svg>
  </div>
);

export default LoadingLogo;
