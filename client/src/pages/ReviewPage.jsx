import React, { useState } from 'react';
// Assuming Navbar is a full-width component
import Navbar from '../components/Navbar';

const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState('answerPaper');

  const questions = [
    { id: 1, question: 'First question', marks: 2, totalMarks: 5 },
    { id: 2, question: 'Second question', marks: 5, totalMarks: 5 },
    { id: 3, question: 'Third question', marks: 3, totalMarks: 5 },
    { id: 4, question: 'Fourth question', marks: 5, totalMarks: 5 }
  ];

  const totalMarks = questions.reduce((total, question) => total + question.marks, 0);
  const totalPossibleMarks = questions.reduce((total, question) => total + question.totalMarks, 0);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    return (
      <div className="bg-gray-100 p-6 shadow rounded text-gray-700">
        {activeTab === 'answerPaper' && <div>Answer paper content</div>}
        {/* Additional tab content could be conditionally rendered here */}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="w-full">
        <Navbar currentPage="review" />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col w-full lg:w-3/4 p-8">
          <h2 className="text-2xl font-bold mb-6">FLAT series-1</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student: <span className="text-blue-500">1. John Doe</span>
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option>John Doe</option>
              {/* More student options could be dynamically rendered here */}
            </select>
          </div>
          {questions.map((q) => (
            <div key={q.id} className="bg-white mb-4 p-4 shadow-md rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{q.id}. {q.question}</h3>
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Marks {q.marks}/{q.totalMarks}
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Confidence
                  </button>
                </div>
              </div>
              <textarea className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" rows="2" placeholder="Student answer" disabled></textarea>
              <textarea className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="2" placeholder="Feedback" disabled></textarea>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-3 mb-6 leading-tight focus:outline-none focus:shadow-outline" placeholder="Marks" disabled />
            </div>
          ))}
          <div className="text-right font-semibold">Total marks: {totalMarks}/{totalPossibleMarks}</div>
        </div>
        <div className="w-1/4 p-8">
          <div className="flex lg:flex-col justify-start lg:justify-between lg:space-y-2">
            {['Answer paper', 'Question paper', 'Scheme'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab.toLowerCase().replace(/\s/g, ''))}
                className={`text-lg p-4 rounded-lg transition-colors duration-150 ${
                  activeTab === tab.toLowerCase().replace(/\s/g, '') ? 'bg-blue-600 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
