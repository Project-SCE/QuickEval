import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'; // Adjust the import path as necessary
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import EvaluatorPage from './pages/Evaluator';
import {auth} from './firebase';
import { AuthProvider } from './Authcontext';

function App() {
  return (
    <AuthProvider auth={auth}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />  // Now LandingPage is at root
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/evaluator" element={<EvaluatorPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
