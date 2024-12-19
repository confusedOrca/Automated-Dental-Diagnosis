import React, { useState, useRef } from "react";
import ImageDisplay from "./ImageDisplay";
import axios from "axios";
import FormButton from "./FormButton";
import Spinner from "./Spinner";

export default function Uploader({ setReport, setId }) {
  const [imageUrl, setImageUrl] = useState("generic.png");
  const [maskUrl, setMaskUrl] = useState("na.png");
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    setIsUploaded(true);
    setIsProcessing(true);
    setTimeout(() => {
      fetch("/dummy.json")
        .then((response) => response.json())
        .then((data) => {
          setId(data.id);
          setImageUrl(data.imageUrl);
          setMaskUrl(data.maskUrl);
          setReport(data.report);
          setIsProcessing(false);
        })
        .catch((error) => {
          console.error("Error reading the dummy JSON file:", error);
        });
    }, 10000);

    /*
  const formData = new FormData();
  formData.append("file", selectedFile);
    axios
      .post("http://localhost:8000/upload", formData)
      .then((response) => {
        setId(response.data.id);
        setImageUrl(response.data.imageUrl);
        setMaskUrl(response.data.maskUrl);
        setReport(response.data.report);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  */
  };

  const handleReset = () => {
    setImageUrl("generic.png");
    setMaskUrl("na.png");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsUploaded(false);
    setReport("");
    setId("");
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center w-11/12 h-[32rem] py-16 bg-gray-100"
      >
        <div className="flex space-x-16">
          <ImageDisplay
            imageUrl={imageUrl}
            title={
              selectedFile == null
                ? "Select An Image"
                : !isUploaded
                ? "Selected Image"
                : "Uploaded Image"
            }
          />
          <ImageDisplay imageUrl={maskUrl} title="Segmentation Mask" />
        </div>

        <div className="flex space-x-4 items-center">
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileSelect}
            ref={fileInputRef}
            className="hidden"
          />
          {!selectedFile && (
            <FormButton
              onClick={() => fileInputRef.current.click()}
              label="Choose an Image"
              bgColor="bg-blue-500"
            />
          )}

          {selectedFile && (
            <FormButton
              onClick={handleUpload}
              disabled={isUploaded}
              label="Upload"
              bgColor="bg-green-500"
            />
          )}

          <FormButton
            onClick={handleReset}
            disabled={!selectedFile | processing}
            label="Reset"
            bgColor="bg-red-500"
          />
        </div>
      </form>

      {processing && (
        <div className="fixed">
          <Spinner />
        </div>
      )}
    </>
  );
}
