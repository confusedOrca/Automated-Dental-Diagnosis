import React from "react";

function ImageDisplay({ imageUrl, title = "Image" }) {
  return (
    <div className="flex flex-col mb-8">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">{title}</h2>
      <img src={imageUrl} alt="Display" className="rounded-3xl object-fill h-80 w-80" />
    </div>
  );
}

export default ImageDisplay;
