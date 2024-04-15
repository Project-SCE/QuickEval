import React from 'react';
import Navbar from './Navbar';
// Import any other components you may have

const Landing = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#486284' }}>
      <Navbar />
      <div className="flex flex-col justify-center items-start p-12 text-white h-screen">
        <h1 className="text-6xl font-bold mb-4">NO MORE GRADING HASSLES:</h1>
        <h2 className="text-5xl font-bold mb-4">SAY HELLO TO INSTANT SCORES!</h2>
        <p className="text-2xl mb-8">Experience the future of grading! Our tool automates the tedious task of grading papers, giving you instant scores without the hassle. Say goodbye to hours of manual work and hello to quick, accurate results!</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-lg">Get Started</button>
      </div>
      {/* Add other sections/components here */}
    </div>
  );
};

export default Landing;
