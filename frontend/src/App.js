import React, { useState } from "react";
import Uploader from "./components/Uploader";
import Report from "./components/Report";

function App() {
  const [report, setReport] = useState("");
  const [id, setId] = useState("");
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full h-40 bg-gray-900 text-white items-center">
        <h1 className="text-4xl w-full text-center">Automated Dental Diagnosis</h1>
      </div>
      <Uploader setReport={setReport} setId={setId} />
      <div className="flex w-11/12 p-8 bg-slate-200">
        <Report report={report}></Report>
      </div>
    </div>
  );
}

export default App;
