import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Question from '../components/Question';

const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState('answerPaper');
  const storedResultsString = localStorage.getItem("results");
  const storedResults = storedResultsString ? JSON.parse(storedResultsString) : [];
  
  const studentData = storedResults.map((result)=> {
    const jsonString = result.data.substring(7, result.data.length - 3);
    return JSON.parse(jsonString);
  });
  console.log(studentData);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

  const handleStudentChange = (index) => {
    setSelectedStudentIndex(index);
  };

  const renderTabContent = () => {
    if (selectedStudentIndex !== null) {
      const student = studentData[selectedStudentIndex];
      const totalMarks = student.answers.reduce((total, answer) => total + answer.score[0], 0);
      const totalPossibleMarks = student.answers.reduce((total, answer) => total + answer.score[1], 0);

      return (
        <div className="bg-gray-100 p-6 shadow rounded text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-4">{student.student_name}</h3>
            <div>
              {student.answers.map((answer) => (
                <Question
                  key={answer.question_no}
                  id={answer.question_no}
                  answer={answer.answer}
                  remarks={answer.remarks}  
                  question={answer.question}
                  marks={answer.score[0]}
                  totalMarks={answer.score[1]}
                  confidence={answer.confidence >= 0.7 ? 'high' : answer.confidence >= 0.4 ? 'medium' : 'low'}
                />
              ))}
            </div>
            <div className="text-right font-semibold mt-4">Total marks: {totalMarks}/{totalPossibleMarks}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 p-6 shadow rounded text-gray-700">
          <div>Select a student to view their answers</div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="w-full">
        <Navbar currentPage="review" />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col w-full lg:w-2/3 px-8 pt-8 pb-8 lg:pb-0 lg:pt-8">
          <h2 className="text-2xl font-bold mb-6">Review - FLAT series-1</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student:
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => handleStudentChange(e.target.value)}
            >
              <option value="">Select a student</option>
              {studentData.map((student, index) => (
                <option key={index} value={index}>{student.student_name}</option>
              ))}
            </select>
          </div>
          {renderTabContent()}
        </div>
        <div className="w-full lg:w-1/3 px-8 pt-8 pb-8 lg:pt-8 lg:pb-0">
          <div className="flex justify-between space-x-4">
            {['Answer paper', 'Question paper', 'Scheme'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(/\s/g, ''))}
                className={`text-lg p-4 rounded-lg transition-colors duration-150 ${
                  activeTab === tab.toLowerCase().replace(/\s/g, '') ? 'bg-blue-600 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
