import React, { useState } from "react";
import { updateCookie } from "./utils/cookie_updater";
import { getCookieValue } from "./utils/cookie_decoder";
import Uploader from "./components/Uploader";
import Report from "./components/Report";
import Disclaimer from "./components/Disclaimer";
import Header from "./components/Header";

export default function App() {
  const [data, setData] = useState({
    imageUrl: getCookieValue("imageUrl") || "generic.png",
    maskUrl: getCookieValue("maskUrl") || "na.png",
    report: getCookieValue("report") || "report.txt",
  });

  const updateData = (updates) => {
    setData((prev) => {
      const newState = { ...prev, ...updates };
      updateCookie(newState.imageUrl, newState.maskUrl, newState.report);
      return newState;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Header className={"text-4xl text-white font-mono bg-gray-900"}>
        Automated Dental Diagnosis
      </Header>
      <Uploader data={data} updateData={updateData} />
      <div className="flex w-11/12 p-8 bg-slate-200 mb-12 rounded-xl">
        <Report report={data.report} />
      </div>
      <Disclaimer />
    </div>
  );
}
