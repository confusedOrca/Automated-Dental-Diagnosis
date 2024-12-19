import React from "react";

export default function FormButton({ onClick, disabled = false, label, bgColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`py-2 rounded-lg w-48 ${bgColor} text-white disabled:bg-gray-500 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
}
