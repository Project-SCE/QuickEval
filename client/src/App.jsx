import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'; // Adjust the import path as necessary
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import AnswerUpload from './pages/AnswerUpload';
import Evaluator from './pages/Evaluator';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />  // Now LandingPage is at root
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/answerupload" element={<AnswerUpload />} />
        <Route path="/evaluator" element={<Evaluator />} />
      </Routes>
    </Router>
  );
}

export default App;
