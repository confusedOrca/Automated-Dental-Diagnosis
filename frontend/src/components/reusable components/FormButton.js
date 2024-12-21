import React from "react";

export default function FormButton({ onClick, children, bgColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 rounded-lg w-48 ${bgColor} text-white disabled:bg-gray-500 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
