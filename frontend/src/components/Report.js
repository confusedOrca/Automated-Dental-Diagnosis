import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Report({ report }) {
  const [reportContent, setReportContent] = useState("");

  useEffect(() => {
    axios
      .get(report)
      .then((response) => {
        setReportContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      });
  }, [report]);

  return (
    <div className="w-full min-h-64 space-y-4 px-4">
      <h3 className="text-xl w-full text-center pb-4 mb-8 border-b-[1px] border-black">
        Automated Dental Diagnosis Report
      </h3>

      <div className="text-justify text-sm" dangerouslySetInnerHTML={{ __html: reportContent }} />
    </div>
  );
}
