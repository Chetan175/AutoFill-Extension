/* global chrome */

import './App.css';
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
      console.log(response.data);
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
    <div className="app-container">
      {/* Top Navigation Bar */}
      <div className="navbar">
        <div className="left-section">
          <select className="profile-dropdown">
            <option value="profile1">Profile 1</option>
            <option value="profile2">Profile 2</option>
            <option value="profile3">Profile 3</option>
          </select>
        </div>
        <h1 className="logo">Auto Job Filler</h1>
        <button className="signout-btn">Sign Out</button>
      </div>

      {/* Center Content */}
      <div className="center-content">
        <div>
          <img
            className="image-preview"
            src='/pdf.png'
            alt=""
            // alt={file ? "Preview" : "No file selected"}
          />
        </div>
        <h2>{parsedData ? JSON.stringify(parsedData.fileName) : (!file)? "Select File":"Confirm Upload"}</h2>
        <div class="select-upload-buttons">
        <label className="choose-btn">
          Choose File
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
            disabled={isLoading}
          />
        </label>
        <button
          className="upload-btn"
          onClick={handleFileUpload}
          disabled={isLoading || !file}
        >
          {isLoading ? "Uploading..." : "Upload and Parse Resume"}
        </button>
        </div>
      </div>

      {/* Parsed Data Display */}
      
      {parsedData && (
        <div className='Content'>
        <div className="parsed-data">
          <h3>Parsed Data</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
          <button onClick={handleSaveToStorage} className="choose-btn">
            Save for Autofill
          </button>
          <button onClick={handleAutofill} className="upload-btn">
            Autofill Forms
          </button>
        </div>
        </div>
      )}
    </div>
  );
};


export default App;
