import React from 'react';
import { uploadDataset } from '../services/api';

const FileUploader = () => {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const res = await uploadDataset(file);
            alert('Upload status: ' + res.status);
        }
    };

    return (
        <input type="file" accept=".csv" onChange={handleFileChange} />
    );
};

export default FileUploader;