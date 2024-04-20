import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const AnswerUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    // Access the selected files from the event
    const selectedFiles = Array.from(event.target.files);
    // Update the state with the selected files
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
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

  return (
    <div>
      <Navbar />
      <div style={labelStyle}>Flat 1</div>
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
      <div style={{ position: 'absolute', top: 'calc(30vh + 50px + 1.5cm)', left: '20px', zIndex: '9999' }}>
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name} uploaded</li>
            ))}
          </ul>
        )}
      </div>
      {/* Your other content goes here */}
    </div>
  );
};

export default AnswerUpload;
