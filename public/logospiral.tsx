import React from "react";

const Logo = ({ width = "22px", height = "auto", className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 45"
      x="0px"
      y="0px"
      width={width}
      fill="currentColor"
    >
      <title>Монтажная область 9</title>
      <path d="M1.3,17.58A13.89,13.89,0,0,0,0,23.19a9.08,9.08,0,0,0,2.24,6.49,3.34,3.34,0,0,0,1.32.91,1.53,1.53,0,0,0,1.09-.28.87.87,0,0,0,.33-.7,2.15,2.15,0,0,0-.32-1.16C2,25.17,2.6,21.67,4.25,18.33a24.31,24.31,0,0,1,13.16-12,9.23,9.23,0,0,1,8.72.92c6.08,3.82,8.12,12.5,6.15,17.92a6.81,6.81,0,0,1-3.72,4.23,11.93,11.93,0,0,1-9.67.15A6.12,6.12,0,0,1,15,23.35a6.23,6.23,0,0,1,4.8-5.56,2.75,2.75,0,0,1,3,1,2.52,2.52,0,0,1,.33,3.07c-.42.7-1.06,1.28-1.47,2a1.22,1.22,0,0,0,.28,1.5,1.45,1.45,0,0,0,1.53.25,2,2,0,0,0,.72-.39,5.61,5.61,0,0,0,2.13-6.58,6.05,6.05,0,0,0-6.18-3.92,9.23,9.23,0,0,0-8,11c1,4.24,3.92,6.52,8,7.47a16.61,16.61,0,0,0,6.59.06,10.53,10.53,0,0,0,9.08-8.93c.2-1.08.25-2.19.31-2.73C36,15,34.06,9.83,29.43,5.91,25.82,2.85,21.66,1.6,17.09,3.23A26.72,26.72,0,0,0,1.3,17.58Z" />
      <text
        x="0"
        y="51"
        fill="#000000"
        font-size="5px"
        font-weight="bold"
        font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      >
        Created by Chintuza
      </text>
      <text
        x="0"
        y="56"
        fill="#000000"
        font-size="5px"
        font-weight="bold"
        font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      >
        from the Noun Project
      </text>
    </svg>
  );
};

export default Logo;
