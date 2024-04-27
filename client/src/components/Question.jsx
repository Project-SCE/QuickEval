import React, { useState } from 'react';

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

const Question = ({ id, question,answer,remarks, marks, totalMarks, confidence }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Stop the event from bubbling up to the parent div
  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`mb-4 p-4 shadow-md rounded ${isExpanded ? 'bg-blue-50' : 'bg-white'}`} onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-center mb-2 cursor-pointer">
        <h3 className="text-lg font-semibold">{id}. {question}</h3>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded ${confidenceColor(confidence)}`}>
            Marks {marks}/{totalMarks}
          </div>
          <div className={`px-2 py-1 rounded ${confidenceColor(confidence)}`}>
            {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
          </div>
        </div>
      </div>
      {isExpanded && (
        <>
          <h1>Answer</h1>
          <h3 className="text-sm font-semibold"> {answer}</h3>
          <h1>Feedback</h1>
          <h3 className="text-sm font-semibold"> {remarks}</h3>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-3 mb-6 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Marks"
            onClick={handleInputClick}
          />
        </>
      )}
    </div>
  );
};

export default Question;
