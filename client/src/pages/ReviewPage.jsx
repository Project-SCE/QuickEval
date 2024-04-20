import React, { useState } from 'react';
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
    return <div className="bg-white p-4 shadow rounded">{`${activeTab} content`}</div>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full">
        <Navbar currentPage="review" />
      </div>
      <div className="flex-grow bg-gray-100 p-8 w-full">
        <div className="flex w-full">
          <div className="flex-grow bg-white shadow-md rounded p-6">
            <h2 className="text-2xl font-bold mb-4">FLAT series-1</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Student:</label>
              <select className="shadow border rounded w-1/2 py-2 px-3 text-gray-700">
                <option>John Doe</option>
                {/* More student options could be dynamically rendered here */}
              </select>
            </div>
            {questions.map((q) => (
              <div key={q.id} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{q.id}. {q.question}</h3>
                  <span>Marks {q.marks}/{q.totalMarks}</span>
                </div>
                <textarea className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Student answer" />
                <textarea className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Feedback" />
              </div>
            ))}
            <div className="text-right font-semibold">Total marks: {totalMarks}/{totalPossibleMarks}</div>
          </div>
          <div className="w-1/4 ml-4 p-6">
            <div className="flex flex-col space-y-2 mb-4">
              {['Answer paper', 'Question paper', 'Scheme'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab.toLowerCase().replace(/\s/g, ''))}
                  className={`text-lg w-full text-left p-3 rounded-lg transition-colors duration-150 ${
                    activeTab === tab.toLowerCase().replace(/\s/g, '') ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
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
    </div>
  );
};

export default ReviewPage;
