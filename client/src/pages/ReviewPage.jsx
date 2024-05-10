import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Question from '../components/Question';
import { useLocation } from 'react-router-dom';
import Select, { components } from 'react-select';
import axios from 'axios';


const { Option, SingleValue } = components;



const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState('answerPaper');
  const [results, setResults] = useState();
  const [selectedOption, setSelectedOption] = useState(null);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const evaluatorId = searchParams.get('evaluatorId');
  const title = searchParams.get('title');

  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/review/${evaluatorId}`);
        setResults(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, you could set an error state to display an error message in the UI
      }
    };

    fetchEvaluationData();
  }, [evaluatorId]); 

  const storedResults = results || [];
  const studentData = storedResults.map((result)=> {
    // const jsonString = result.data.substring(0, result.data.length - 1);
    return result.data;
  });
  
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);

  
  const handleSelectionChange = (selectedOption) => {
    // 'selectedOption' is the option object selected by the user
    setSelectedOption(selectedOption); // Updates state with the selected option
    console.log("Selected Student's ID:", selectedOption.value); // Logs the value (ID) of the selected option
    console.log("Selected Student's Name:", selectedOption.label); // Logs the label (Name) of the selected option
    console.log("Selected Student's Index:", selectedOption.index);
    setSelectedStudentIndex(selectedOption.index); // Logs the index of the selected option
  };
  

  
  
  const options = studentData.map((student,index) => ({ // Maps the student data to an array of options
    value: student.student_id,
    label: student.student_name,
    index: index
  }));

  const renderTabContent = () => {    // Renders the content of the selected tab
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

  const CustomOption = (props) => {
    const handleDelete = (studentId, e) => {
      e.stopPropagation(); // Prevent dropdown from closing
      console.log("dele  "+storedResults[studentId]._id) // Logs the student ID to delete
      axios.delete(`http://localhost:3000/review/${storedResults[studentId]._id}`)
        .then(() => {
          console.log('Deletion successful');
          // Optionally, refresh the options or handle UI state
        })
        .catch(error => {
          console.error('Error deleting student:', error);
        });
    };
  
    return (
      <Option {...props}>
        <div className="flex justify-between items-center">
          {props.data.label }
          <button onClick={(e) => handleDelete(props.data.index, e)} className="text-red-500 hover:text-red-700">
            Delete
          </button>
        </div>
      </Option>
    );
  };


  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="w-full">
        <Navbar currentPage="review" />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col w-full lg:w-2/3 px-8 pt-8 pb-8 lg:pb-0 lg:pt-8">
          <h2 className="text-2xl font-bold mb-6">Review - {title}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student:
            </label>
            <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectionChange}
        components={{ Option: CustomOption }}
        className="basic-single"
        classNamePrefix="select"
      />
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
