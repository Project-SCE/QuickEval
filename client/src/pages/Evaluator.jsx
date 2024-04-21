import React, { useState } from 'react';
import Navbarnormal from '../components/Navbarnormal'; 
import { useAuth } from '../Authcontext';

import * as Bytescale from "@bytescale/sdk";


const uploadManager = new Bytescale.UploadManager({
  apiKey: import.meta.env.VITE_BYTESCALE_API_KEY // This is your API key.
});


// Function to generate a random pastel aesthetic background color
const generateBackgroundColor = () => {
  const colors = [
    'bg-pink-100', 'bg-purple-100', 'bg-blue-100',
    'bg-green-100', 'bg-yellow-100', 'bg-red-100',
    'bg-indigo-100', 'bg-teal-100', 'bg-orange-100'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const EvaluatorCard = ({ title, onEdit, onDelete, colorClass }) => {
  return (
    <div className={`w-full h-52 ${colorClass} rounded-lg shadow-md flex flex-col items-center justify-center p-4`}>
    
      <div className="text-gray-700 text-center text-xl font-semibold">{title}</div>
      <div className="flex justify-center gap-2 mt-4">
        <button onClick={onEdit} className="text-sm bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded transition duration-300 ease-in-out">
          Edit
        </button>
        <button onClick={onDelete} className="text-sm bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded transition duration-300 ease-in-out">
          Delete
        </button>
      </div>
    </div>
  );
};

const AddEvaluatorButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="w-full h-52 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-6xl"
    >
      +
    </button>
  );
};

const NewEvaluatorForm = ({ onSubmit, onClose, currentEvaluator }) => {
  const [title, setTitle] = useState(currentEvaluator ? currentEvaluator.title : '');
  const [questionPaper, setQuestionPaper] = useState(currentEvaluator ? currentEvaluator.questionPaper : null);
  const [scheme, setScheme] = useState(currentEvaluator ? currentEvaluator.scheme : null);

  const [isUploading, setIsUploading] = useState(false);

  const onFileSelected = async (event, setter) => {
    const file = event.target.files[0];
    setIsUploading(true);
    try {
      const { fileUrl, filePath } = await uploadManager.upload({ data: file });
      setter(fileUrl);
      
    } catch (e) {
      alert(`Error:\n${e.message}`);
    }finally {
      setIsUploading(false); // Indicate upload has ended
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questionPaper, scheme)
    onSubmit({ 
      title, 
      questionPaper, 
      scheme, 
      colorClass: generateBackgroundColor() // Use generated pastel color
    });
    setTitle('');
    setQuestionPaper(null);
    setScheme(null);
  };

  const Spinner = () => (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
  


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center">
      <div className="bg-gray-400 p-5 rounded-lg shadow-lg w-1/3">

        <div className="text-xl mb-4 flex justify-center font-bold text-black">New Evaluator</div>
        <form onSubmit={handleSubmit}>
        <div className="text-xl  font-jakarta-sans text-black-600 mb-2">
                Enter title
              </div>

          <input 
            className="w-full p-2 mb-4 border border-gray-400 rounded bg-white" 
            type="text" 
            placeholder="Enter title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
          />

          <div className="text-xl  font-jakarta-sans text-black-600 mb-2">
                Upload question paper
              </div>
          <input 
            className="w-full p-2 mb-4 border border-gray-400 rounded bg-white" 
            type="file"
            onChange={(e) => onFileSelected(e, setQuestionPaper)}
            required 
            disabled={isUploading}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <Spinner />
          </div>

          )}
          <div className="text-xl  font-jakarta-sans text-black-600 mb-2">
                Upload scheme
              </div>
          <input 
            className="w-full p-2 mb-4 border border-gray-400 rounded bg-white" 
            type="file" 
            onChange={(e) => onFileSelected(e, setScheme)}
            required 
          />
           {isUploading && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <Spinner />
          </div>

          )}
          <div className="flex justify-center">

            <button type="submit" className="bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
              {currentEvaluator ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const EvaluatorPage = () => {
  const [evaluators, setEvaluators] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

  const { currentUser } = useAuth();

  

  const addEvaluator = (newEvaluator) => {
    if (currentEditingIndex !== null) {
      setEvaluators(prevEvaluators =>
        prevEvaluators.map((e, index) => index === currentEditingIndex ? newEvaluator : e)
      );
      setCurrentEditingIndex(null);
    } else {
      setEvaluators(prevEvaluators => [...prevEvaluators, newEvaluator]);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (index) => {
    setCurrentEditingIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index) => {
    setEvaluators(prevEvaluators => prevEvaluators.filter((_, idx) => idx !== index));
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentEditingIndex(null);
  };

  return (
    <>
      <Navbarnormal currentPage="signin" />
      <div className="p-8">
        <div className="font-bold text-2xl mb-6">Evaluators</div>
        <div className="grid grid-cols-4 gap-4">

        <AddEvaluatorButton onClick={() => setIsFormOpen(true)} />

          {evaluators.map((evaluator, index) => (
            <EvaluatorCard
              key={index}
              title={evaluator.title}
              colorClass={evaluator.colorClass}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}

        </div>
        {isFormOpen && (
          <NewEvaluatorForm
            onSubmit={addEvaluator}
            onClose={handleClose}
            currentEvaluator={currentEditingIndex !== null ? evaluators[currentEditingIndex] : null}
          />
        )}
      </div>
    </>
  );
};

export default EvaluatorPage;
