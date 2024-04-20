import React from 'react';

const AnswerUpload = () => {
  const labelStyle = {
    position: 'absolute',
    top: '20px',
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
      <div style={labelStyle}>Flat 1</div>
      <div style={uploadLabelStyle}>Upload answer paper</div>
      <button style={buttonStyle}>Upload(s)</button>
      <button style={evaluateButtonStyle}>Evaluate</button>
      {/* Your other content goes here */}
    </div>
  );
};

export default AnswerUpload;
