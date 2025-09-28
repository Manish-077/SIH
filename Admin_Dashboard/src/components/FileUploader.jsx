import React, { useState } from 'react';
import { uploadDataset } from '../services/apiService';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setLoading(true);
    setMessage('Uploading...');

    try {
      const response = await uploadDataset(file);
      setMessage(response.message || 'Dataset uploaded successfully!');
      setFile(null);
      e.target.reset();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          disabled={loading || !file}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </form>
  );
};

export default FileUploader;