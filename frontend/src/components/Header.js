import React from "react";

export default function Header({ children, className }) {
  return (
    <div className={`flex justify-center items-center w-full h-32 ${className}`}>{children}</div>
  );
}
