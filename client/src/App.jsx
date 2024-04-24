import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'; // Adjust the import path as necessary
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Review from './pages/ReviewPage'; // Adjust the import path as necessary
import AnswerUpload from './pages/AnswerUpload'; // Adjust the import path as necessary
import EvaluatorPage from './pages/Evaluator';
import {auth} from './firebase';
import { AuthProvider } from './Authcontext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <AuthProvider auth={auth}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />  // Now LandingPage is at root
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/answerupload' element={<AnswerUpload/>}></Route>

        <Route path="/review" element={<Review />} />

        <Route path="/evaluator" element={
          <ProtectedRoute>
            <EvaluatorPage />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
