import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "../socket";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false); // 🟡 for popup message

  useEffect(() => {
    socket.on("progress", (data) => {
      setProgress(data.percent);
    });

    socket.on("complete", () => {
      setProgress(100);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    });

    return () => {
      socket.off("progress");
      socket.off("complete");
    };
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      console.log("data", formData);
    } catch (error) {
      alert("Upload failed!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Bulk Upload
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-700
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        mb-4 cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
      >
        Upload
      </button>
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Progress:</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">{progress}%</p>
      </div>
      {showMessage && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in-down">
          Upload completed successfully!
        </div>
      )}
    </div>
  );
};

export default UploadForm;
