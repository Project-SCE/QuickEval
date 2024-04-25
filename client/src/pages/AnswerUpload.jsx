import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import * as Bytescale from "@bytescale/sdk";

// Initialize Bytescale Upload Manager with the API key
const uploadManager = new Bytescale.UploadManager({
  apiKey: import.meta.env.VITE_BYTESCALE_API_KEY
});

const AnswerUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    const uploadedUrls = [];
    setIsUploading(true);

    // Upload each selected file
    for (const file of selectedFiles) {
      try {
        const { fileUrl } = await uploadManager.upload({ data: file });
        uploadedUrls.push({ name: file.name, url: fileUrl });
      } catch (e) {
        alert(`Error uploading ${file.name}: ${e.message}`);
      }
    }

    setIsUploading(false);
    setUploadedFileUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
  };

  // Handle upload submission
  const handleUpload = async () => {
    if (uploadedFileUrls.length > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/evaluations', {
          evaluatorId: 'some-evaluator-id', // This should be dynamically set
          data: uploadedFileUrls,
          answerSheet: uploadedFileUrls.map(file => file.url), // Store all URLs
        });
        alert('Upload successful!');
      } catch (error) {
        alert('Failed to upload: ' + error.message);
      }
    } else {
      alert('No files selected');
    }
  };

  // Styling
  const labelStyle = {
    position: 'absolute',
    top: '75px',
    left: '20px',
    color: '#000',
    fontFamily: 'Jakarta Sans, sans-serif',
    fontWeight: 'bold',
    padding: '5px 10px',
    zIndex: '9999',
    fontSize: '30px',
  };

  const uploadLabelStyle = {
    position: 'absolute',
    top: '25vh',
    left: '20px',
    color: '#000',
    fontFamily: 'Jakarta Sans, sans-serif',
    padding: '5px 10px',
    zIndex: '9999',
    fontSize: '23px',
  };

  const buttonStyle = {
    backgroundColor: '#8391A3',
    color: '#fff',
    fontFamily: 'Jakarta Sans, sans-serif',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: 'calc(25vh + 50px + 1cm)',
    left: '20px',
    zIndex: '9999',
  };

  const evaluateButtonStyle = {
    backgroundColor: '#8391A3',
    color: '#fff',
    fontFamily: 'Jakarta Sans, sans-serif',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: 'calc(25vh + 50px + 7cm)',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '9999',
  };

  const Spinner = () => (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div style={labelStyle}>Flat 1</div>
      <div style={uploadLabelStyle}>Upload answer paper</div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".png,.jpeg,.jpg"
        multiple
      />
      <button style={buttonStyle} onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload(s)
      </button>
      <button style={evaluateButtonStyle} onClick={handleUpload}>
        Evaluate
      </button>

      <div style={{ marginTop: '16rem' }}>
        {isUploading && <Spinner />}
        {uploadedFileUrls.length > 0 && (
          <ul>
            {uploadedFileUrls.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span> uploaded
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnswerUpload;
