import React, { useState } from 'react';
import axios from 'axios';

const confidenceColor = (confidence) => {
  switch (confidence) {
    case 'low':
      return 'bg-red-200 text-red-800'; // Low confidence
    case 'medium':
      return 'bg-yellow-200 text-yellow-800'; // Medium confidence
    case 'high':
      return 'bg-green-200 text-green-800'; // High confidence
    default:
      return ''; // Default case if confidence is not provided
  }
};

const Question = ({ evaluatorId,roll_no, question_no, question,answer,remarks, marks, totalMarks, confidence }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [newScore, setNewScore] = useState(marks);

  function handleInputChange(event) {
    event.stopPropagation(); // This prevents the click event from bubbling up to the parent
    setInputValue(event.target.value);
    setNewScore(event.target.value);
  }
  
  // This function can be used to handle the update button click
  const handleUpdateClick = async (event) => {
    event.stopPropagation(); // This prevents the click event from bubbling up to the parent
    console.log('Input Value on Update:', inputValue); // Logs the current state
    const Score = parseFloat(newScore);
    if (Score < 0 || Score > totalMarks) {
      alert(`Please enter a score between 0 and ${totalMarks}`);
      return;
    }
    const url = 'http://localhost:3000/update-score';  // URL of your endpoint
    const data = {
        evaluatorId,
        roll_no,
        question_no,
        newScore: Score
    };

    try {
        const response = await axios.post(url, data);
        console.log('Update successful:', response.data);
        alert('Score updated successfully!');
    } catch (error) {
        console.error('Error updating score:', error.response ? error.response.data : error.message);
    }
    setInputValue(''); // Resets the input value
  }
  const handleInputClick= async (event) => {
    event.stopPropagation(); // This should definitely stop the click event from bubbling up
    
    
  }

  return (
    <div className={`mb-4 p-4 shadow-md rounded ${isExpanded ? 'bg-blue-50' : 'bg-white'}`} onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-center mb-2 cursor-pointer">
        <h3 className="text-lg font-semibold">{question_no}. {question}</h3>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded ${confidenceColor(confidence)}`}>
            Marks {newScore}/{totalMarks}
          </div>
          <div className={`px-2 py-1 rounded ${confidenceColor(confidence)}`}>
            {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
          </div>
        </div>
      </div>
      {isExpanded && (
        <>
          <h1 className="text-sm font-semibold">Answer</h1>
          <h3 > {answer}</h3>
          <h1  className="text-sm font-semibold">Feedback</h1>
          <h3> {remarks}</h3>
          <div className="flex flex-row items-center w-full">
            <input
            type="number"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
            placeholder="Update mark"
            value={inputValue}
            onClick={handleInputClick}
            onChange={handleInputChange} // Assuming handleInputClick is defined to handle clicks
            style={{ flex: 1 }} // Takes as much space as possible, adjusting based on the available space
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
              onClick={handleUpdateClick} // Assuming handleInputClick is also intended for the button
            >
            Update
            </button>
          </div>

        </>
      )}
    </div>
  );
};

export default Question;
