import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

import * as Bytescale from "@bytescale/sdk";


const uploadManager = new Bytescale.UploadManager({
  apiKey: import.meta.env.VITE_BYTESCALE_API_KEY // This is your API key.
});

const AnswerUpload = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');

  const [files, setFiles] = useState([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const uploadedUrls = [];
    setIsUploading(true);
    // Loop through each selected file to upload
    for (const file of selectedFiles) {
      try {
        const { fileUrl } = await uploadManager.upload({ data: file });
        //console.log(fileUrl);
        uploadedUrls.push({ name: file.name, url: fileUrl });
      } catch (e) {
        alert(`Error uploading ${file.name}: ${e.message}`);
      }
    }

    setIsUploading(false);
    // Update state with uploaded file URLs
    setUploadedFileUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
  };

  const handleUpload = () => {
    // Perform upload logic with the selected files
    if (files.length > 0) {
      console.log('Uploading files:', files);
      // Add your upload logic here
    } else {
      console.log('No files selected');
    }
  };

  const labelStyle = {
    position: 'absolute',
    top: '75px',
    left: '20px',
    color: '#000',
    fontFamily: 'Jakarta Sans, sans-serif',
    fontWeight: 'bold',
    padding: '5px 10px',
    zIndex: '9999', // To ensure the label is on top of other elements
    fontSize: '30px', // Larger font size
  };

  const uploadLabelStyle = {
    position: 'absolute',
    top: '25vh', // Adjust as needed
    left: '20px',
    color: '#000',
    fontFamily: 'Jakarta Sans, sans-serif',
    padding: '5px 10px',
    zIndex: '9999', // To ensure the label is on top of other elements
    fontSize: '23px', // Adjust as needed
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
    top: 'calc(25vh + 50px + 1cm)', // Adjust as needed
    left: '20px',
    zIndex: '9999', // To ensure the button is on top of other elements
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
    top: 'calc(25vh + 50px + 7cm)', // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)', // Center the button horizontally
    zIndex: '9999', // To ensure the button is on top of other elements
  };
  const Spinner = () => (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div style={labelStyle}>{title}</div>
      <div style={uploadLabelStyle}>Upload answer paper</div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input element visually
        accept=".png,.jpeg,.jpg"
        multiple // Allow multiple file selection
      />
      <button style={buttonStyle} onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload(s)
      </button>

      <button style={evaluateButtonStyle} onClick={handleUpload}>
        Evaluate
      </button>
      
      {/* Render the names of uploaded files */}
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
      {/* Your other content goes here */}
    </div>
  );
};

export default AnswerUpload;
