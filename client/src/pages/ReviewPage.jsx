import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState('answerPaper');

  const questions = [
    { id: 1, marks: 2, totalMarks: 5 },
    { id: 2, marks: 5, totalMarks: 5 },
    { id: 3, marks: 3, totalMarks: 5 },
    { id: 4, marks: 5, totalMarks: 5 }
  ];

  const totalMarks = questions.reduce((total, question) => total + question.marks, 0);
  const totalPossibleMarks = questions.reduce((total, question) => total + question.totalMarks, 0);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'answerPaper':
        return 'Answer paper content'; // Replace with actual content component
      case 'questionPaper':
        return 'Question paper content'; // Replace with actual content component
      case 'scheme':
        return 'Scheme content'; // Replace with actual content component
      default:
        return 'Content not found';
    }
  };

  return (
    <>
      <Navbar currentPage="review" />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700">Student:</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>John Doe</option>
              {/* More options */}
            </select>
          </div>
          <div className="flex mb-4">
            <div className="flex-initial w-3/4 bg-white p-6 shadow rounded-lg">
              <header className="border-b pb-4 mb-4">
                <h1 className="text-xl font-semibold">FLAT series-1</h1>
              </header>
              {questions.map((question) => (
                <div key={question.id} className="mb-4 p-4 bg-gray-100 rounded shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Question {question.id}</h2>
                    <span>
                      Marks {question.marks}/{question.totalMarks}
                    </span>
                  </div>
                  <textarea className="w-full p-2 mb-4 border rounded" placeholder="Student answer" />
                  <textarea className="w-full p-2 mb-4 border rounded" placeholder="Feedback" />
                </div>
              ))}
              <footer>
                <h2 className="text-lg font-semibold">Total marks: {totalMarks}/{totalPossibleMarks}</h2>
              </footer>
            </div>
            <div className="flex-initial w-1/4 ml-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  {['answerPaper', 'questionPaper', 'scheme'].map((tabName) => (
                    <button
                      key={tabName}
                      onClick={() => handleTabChange(tabName)}
                      className={`text-lg text-left p-2 rounded ${
                        activeTab === tabName ? 'bg-blue-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {tabName.replace(/([A-Z])/g, ' $1').trim()} {/* Add space before capital letters */}
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  {getTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
