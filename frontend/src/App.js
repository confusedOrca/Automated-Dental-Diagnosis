import React from "react";
import Uploader from "./components/Uploader";

function App() {
  return (
    <div className="flex items-center flex-col">
      <div className="flex w-full h-40 bg-gray-900 text-white items-center">
        <h1 className="text-4xl font-bold w-full text-center">Automated Dental Diagnosis</h1>
      </div>
      <Uploader />
    </div>
  );
}

export default App;
