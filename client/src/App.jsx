import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'; // Adjust the import path as necessary
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Review from './pages/ReviewPage'; // Adjust the import path as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />  // Now LandingPage is at root
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
