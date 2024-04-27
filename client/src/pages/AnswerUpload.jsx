import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FiCheckCircle, FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import * as Bytescale from "@bytescale/sdk";

// Initialize Bytescale Upload Manager with the API key
const uploadManager = new Bytescale.UploadManager({
  apiKey: import.meta.env.VITE_BYTESCALE_API_KEY
});

const AnswerUpload = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const evaluatorId = searchParams.get('evaluatorId');

 

  const [files, setFiles] = useState([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [answerSheets, setAnswerSheets] = useState([]);
  const [results, setResults] = useState([]);


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
        
        uploadedUrls.push({ name: file.name, url: fileUrl } );
        
      } catch (e) {
        alert(`Error uploading ${file.name}: ${e.message}`);
      }
    }

    setIsUploading(false);
    setUploadedFileUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setAnswerSheets((prevUrls) => [...prevUrls, ...uploadedUrls.map(item => item.url)])
  };
  
  const valuate = async (answerSheet) => {
    const config = {
      method: "POST",
      url: "http://localhost:3000/evaluators/evaluate",
      headers: {
        
        "Content-Type": `application/json`,
      },
      data: {
        evaluatorId: evaluatorId,
        answerSheet: answerSheet,
      }
    };
    

    var response = await axios(config);
    

     // Retrieve existing results from localStorage
     
     const updatedResults = [...results, response.data];
     // Optionally, update state or perform any other necessary actions
     setResults(updatedResults);
     console.log(results)

    return response.data;
  }

  const [currentValuatingSheet, setCurrentValuatingSheet] = useState(1);
  const [valuating, setValuating] = useState(false);

  const valuateAnswerSheets = async () => {
    (document.getElementById("valuation_modal")).showModal();
    setValuating(true);
    console.log(answerSheets)
    for (const answerSheet of answerSheets) {
      const data = await valuate(answerSheet); 
      const existingResults = JSON.parse(localStorage.getItem("results")) || [];
      // Append the new result to the existing results
     const updatedResults = [...existingResults, data];
     localStorage.setItem("results", JSON.stringify(updatedResults));
      setCurrentValuatingSheet(currentValuatingSheet + 1);
    }

    toast.success("Valuation completed");
    setValuating(false);
    (document.getElementById("valuation_modal")).close();

    // setTimeout(() => {
    //   window.location.href = `/review`;
    // }, 1000);
  };

  const handleUpload = () => {
    // Perform upload logic with the selected files
    console.log("answerpaper urls "+answerSheets)
    if (files.length > 0) {
      console.log('Uploading files:', files);
      // Add your upload logic here
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
      <div style={labelStyle}>{title}</div>
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

      <button style={evaluateButtonStyle} onClick={() => {
            valuateAnswerSheets();}}>
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
      {/* Your other content goes here */}
      <dialog id="valuation_modal" className="modal">
        <div className="modal-box max-w-2xl align-middle">
          <h3 className="flex items-center font-bold text-2xl mb-5">
            <FiCheckCircle className="mr-2" /> Valuating Answer Sheets
          </h3>
          <div className="my-10 flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg mb-10"></span>
            <p className="text-lg mb-5">Valuating Answer Sheet {currentValuatingSheet} of {answerSheets?.length}</p>
            <progress className="progress mb-5 w-[20vw]" value={currentValuatingSheet / answerSheets?.length * 100} max="100"></progress>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AnswerUpload;
