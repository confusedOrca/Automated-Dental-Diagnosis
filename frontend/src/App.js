import React, { useState } from "react";
import Uploader from "./components/Uploader";
import Report from "./components/Report";
import { getCookieValue } from "./utils/cookie_decoder";
import Disclaimer from "./components/Disclaimer";

function App() {
  const [report, setReport] = useState(() => getCookieValue("report") || "");

  return (
    <>
      <div className="flex flex-col items-center mb-32 h-full">
        <div className="flex w-full h-40 bg-gray-900 text-white items-center">
          <h1 className="text-4xl w-full text-center">Automated Dental Diagnosis</h1>
        </div>
        <Uploader setReport={setReport} />
        <div className="flex w-11/12 p-8 bg-slate-200">
          <Report report={report} />
        </div>
      </div>
      <Disclaimer />
    </>
  );
}

export default App;
