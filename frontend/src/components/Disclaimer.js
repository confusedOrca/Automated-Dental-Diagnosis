import React from "react";

const Disclaimer = () => {
  return (
    <div
      className="fixed bottom-0 left-0 text-xs bg-gray-300 w-full py-4 px-16"
      style={{ zIndex: 1000 }}
    >
      <p className="text-center">
        <strong className="text-red-700">Disclaimer: </strong>
        This AI tool is not a substitute for professional dental diagnosis.
      </p>
    </div>
  );
};

export default Disclaimer;
