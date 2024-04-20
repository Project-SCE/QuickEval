import React, { useState } from 'react';

const Question = ({ id, question, marks, totalMarks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`mb-4 p-4 shadow-md rounded ${isExpanded ? 'bg-blue-50' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{id}. {question}</h3>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded ${isExpanded ? 'bg-blue-300' : 'bg-blue-100'} text-blue-800`}>
            Marks {marks}/{totalMarks}
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            {isExpanded ? 'Collapse' : 'Confidence'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <>
          <textarea className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" rows="3" placeholder="Student answer"></textarea>
          <textarea className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3" placeholder="Feedback"></textarea>
          <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-3 mb-6 leading-tight focus:outline-none focus:shadow-outline" placeholder="Marks" />
        </>
      )}
    </div>
  );
};

export default Question;
