import React, { useState, useRef } from "react";
import ImageDisplay from "./reusable components/ImageDisplay";
import FormButton from "./reusable components/FormButton";
import Spinner from "./reusable components/Spinner";
import axios from "axios";

export default function Uploader({ data, updateData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState("IDLE");
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      updateData({ imageUrl: reader.result });
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setProcessing("DIAGNOSE");
    axios
      .post("http://localhost:8000/upload/", formData)
      .then(({ data }) => {
        fileRef.current.value = "";
        updateData({ imageUrl: data.imageUrl, maskUrl: data.maskUrl, report: data.report });
        setProcessing("IDLE");
        setSelectedFile(null);
      })
      .catch(() => setProcessing("IDLE"));
  };

  const handleReset = async () => {
    try {
      setProcessing("RESET");
      if (data.imageUrl === "generic.png") throw new Error("No Image Selected");
      const uuid = data.imageUrl.split("/").pop().split(".")[0];
      await axios.post(`http://localhost:8000/reset/${uuid}/`);
    } catch (error) {
      console.error("fetching error: " + error);
    } finally {
      setTimeout(() => {
        updateData({ imageUrl: "generic.png", maskUrl: "na.png", report: "report.txt" });
        setSelectedFile(null);
        fileRef.current.value = "";
        setProcessing("IDLE");
      }, 400);
    }
  };

  return (
    <>
      <div className="hidden">
        <input type="file" accept="image" onChange={handleFile} ref={fileRef} />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center py-8">
        <div className="flex space-x-8 mb-4">
          <ImageDisplay
            imageUrl={data.imageUrl}
            title={
              !data.maskUrl || data.maskUrl === "na.png" ? "Upload An Image" : "Uploaded Image"
            }
          />
          <ImageDisplay imageUrl={data.maskUrl} title="Segmentation Mask" />
        </div>
        <div className="flex space-x-2 mb-4 items-center">
          {selectedFile && (
            <FormButton onClick={handleUpload} bgColor="bg-green-500">
              Upload
            </FormButton>
          )}
          {data.maskUrl === "na.png" && (
            <FormButton onClick={() => fileRef.current.click()} bgColor="bg-blue-500">
              Choose An Image
            </FormButton>
          )}
          <FormButton onClick={handleReset} bgColor="bg-red-500">
            Reset
          </FormButton>
        </div>
      </form>
      {
        <div className="fixed">
          <Spinner mode={processing} />
        </div>
      }
    </>
  );
}
