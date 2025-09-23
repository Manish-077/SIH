import React from 'react';
import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader';

const Data = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <NavBar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 font-sans">
        <h1 className="text-3xl font-bold mb-8">Retrain AI Model</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Upload New Dataset</h2>
          <p className="mb-4">
            Upload a new CSV file to retrain the AI model. The file should have the following columns: `Soil_Type`, `Rainfall_mm`, `Temperature_C`, `Fertilizer_Used_kg_per_acre`, `Crop`, `Yield_quintals_per_acre`.
          </p>
          <FileUploader />
        </div>
      </div>
    </div>
  );
};

export default Data;