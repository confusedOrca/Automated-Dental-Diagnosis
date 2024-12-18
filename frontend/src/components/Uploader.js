import React, { useState, useRef } from "react";
import ImageDisplay from "./ImageDisplay";

export default function Uploader() {
  const [imageUrl, setImageUrl] = useState("generic.png");
  const [maskUrl, setMaskUrl] = useState("na.png");
  const [isUploaded, setIsUploaded] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsUploaded(true);
      /*api call*/
    }
  };

  const handleReset = () => {
    setImageUrl("generic.png");
    setMaskUrl("na.png");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsUploaded(false);
  };

  return (
    <div className="flex justify-center w-4/5 py-24 bg-gray-100">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center">
        <div className="flex space-x-24">
          <ImageDisplay imageUrl={imageUrl} title="Uploaded Image" />
          <ImageDisplay imageUrl={maskUrl} title="Segmentation Mask" />
        </div>

        <div className="flex space-x-8 items-center">
          <label className="block">
            <span className="sr-only">Select Image</span>
            {!selectedFile && (
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
              />
            )}
            {!selectedFile && (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-48"
              >
                {selectedFile ? selectedFile.name : "Choose an Image"}
              </button>
            )}
          </label>
          {selectedFile && (
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploaded}
              className={`px-4 py-2 bg-green-500 text-white rounded-lg w-48 disabled:cursor-not-allowed disabled:bg-gray-500`}
            >
              Upload
            </button>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg w-48 disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={!selectedFile}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
