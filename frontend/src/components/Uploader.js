import React, { useState, useRef } from "react";
import ImageDisplay from "./ImageDisplay";
import FormButton from "./FormButton";
import Spinner from "./Spinner";
import axios from "axios";
import { getCookieValue } from "./../utils/cookie_decoder";

export default function Uploader({ setReport }) {
  const [imageUrl, setImageUrl] = useState(() => getCookieValue("imageUrl") || "generic.png");
  const [maskUrl, setMaskUrl] = useState(() => getCookieValue("maskUrl") || "na.png");
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState("IDLE");
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
    const formData = new FormData();
    formData.append("file", selectedFile);
    setProcessing("DIAGNOSE");

    axios
      .post("http://localhost:8000/upload/", formData)
      .then((response) => {
        const { imageUrl, maskUrl, report } = response.data;

        document.cookie = `imageUrl=${encodeURIComponent(imageUrl)}; path=/;`;
        document.cookie = `maskUrl=${encodeURIComponent(maskUrl)}; path=/;`;
        document.cookie = `report=${encodeURIComponent(report)}; path=/;`;

        setImageUrl(imageUrl);
        setMaskUrl(maskUrl);
        setReport(report);
        setProcessing("IDLE");
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setIsUploaded(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setProcessing("IDLE");
      });
  };

  const handleReset = async () => {
    try {
      setProcessing("RESET");
      const uuid = imageUrl.split("/").pop().split(".")[0];
      await axios.post(`http://localhost:8000/reset/${uuid}/`);
    } catch (error) {
      console.error("Error resetting files:", error);
    } finally {
      document.cookie = "imageUrl=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = "maskUrl=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = "report=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

      setImageUrl("generic.png");
      setMaskUrl("na.png");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setIsUploaded(false);
      setReport("");
      setProcessing("IDLE");
    }
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
          {maskUrl === "na.png" && (
            <FormButton
              onClick={() => fileInputRef.current.click()}
              label="Choose an Image"
              bgColor="bg-blue-500"
            />
          )}

          {selectedFile && (
            <FormButton
              onClick={handleUpload}
              disabled={!selectedFile}
              label="Upload"
              bgColor="bg-green-500"
            />
          )}

          <FormButton onClick={handleReset} disabled={false} label="Reset" bgColor="bg-red-500" />
        </div>
      </form>

      {processing !== "IDLE" && (
        <div className="fixed">
          <Spinner mode={processing} />
        </div>
      )}
    </>
  );
}
