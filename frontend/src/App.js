/* global chrome */


import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload and resume parsing
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a resume to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setIsLoading(true);

    try {
      // Send the file to the backend for parsing
      const response = await axios.post("http://localhost:5000/api/parse-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update parsed data state
      setParsedData(response.data);
      alert("Resume parsed successfully!");
    } catch (error) {
      console.error("Error parsing resume:", error);
      alert("Failed to parse the resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Save parsed data to Chrome storage for autofill
  const handleSaveToStorage = () => {
    if (!parsedData) {
      alert("No parsed data to save.");
      return;
    }

    chrome.storage.local.set({ parsedData }, () => {
      alert("Parsed data saved for autofill!");
    });
  };

  // Trigger autofill on current webpage
  const handleAutofill = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "autofill" });
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Auto Job Filler</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        disabled={isLoading}
      />
      <button
        onClick={handleFileUpload}
        disabled={isLoading || !file}
        style={{ marginLeft: "10px" }}
      >
        {isLoading ? "Uploading..." : "Upload and Parse Resume"}
      </button>

      {parsedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Parsed Data</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          <button onClick={handleSaveToStorage} style={{ marginTop: "10px" }}>
            Save for Autofill
          </button>
          <button
            onClick={handleAutofill}
            style={{
              marginTop: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Autofill Forms
          </button>
        </div>
      )}
    </div>
  );
};


export default App;
