import React, { useState, useEffect } from "react";

export default function Report({ report }) {
  const [reportContent, setReportContent] = useState("");

  useEffect(() => {
    if (report) {
      fetch(report)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch report: ${response.statusText}`);
          }
          return response.text();
        })
        .then((data) => {
          setReportContent(data);
        })
        .catch((error) => {
          console.error("Error fetching report:", error);
        });
    }
  }, [report]);

  return (
    <div className="w-full min-h-64 space-y-4 px-4">
      <h3 className="text-xl w-full text-center pb-4 mb-8 border-b-[1px] border-black">
        Automated Dental Diagnosis Report
      </h3>
      {report !== "" ? (
        <div className="text-justify text-sm" dangerouslySetInnerHTML={{ __html: reportContent }} />
      ) : (
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
