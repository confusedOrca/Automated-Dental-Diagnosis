import React from "react";

export default function Report({ report }) {
  return (
    <div className="w-full min-h-64 space-y-4 px-4">
      <h3 className="text-xl w-full text-center pb-4 mb-8 border-b-[1px] border-black">
        Automated Dental Diagnosis Report
      </h3>
      <div className="text-justify text-sm" dangerouslySetInnerHTML={{ __html: report }} />
      {report == "" && (
        <div className="flex justify-center text-sm">
          <p className="text-justify">
            <strong>Instructions:</strong>
            <br />
            1. Choose an image
            <br />
            2. Upload the image
            <br />
            3. Wait until processed.
            <br />
            4. View the generated report.
          </p>
        </div>
      )}
    </div>
  );
}
