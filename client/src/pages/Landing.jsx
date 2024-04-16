import React from 'react';
import Navbar from '../components/Navbar';
import landingPagePic from '../assets/landingpagepic.png'; // Make sure the path is correct

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#486284]">
      <Navbar />
      <div className="flex justify-between items-center p-12 h-screen">
        <div className="flex-1">
          <h1 className="text-6xl font-bold mb-4">NO MORE GRADING HASSLES:</h1>
          <h2 className="text-5xl font-bold mb-4">SAY HELLO TO INSTANT SCORES!</h2>
          <p className="text-2xl mb-8">Experience the future of grading! Our tool automates the tedious task of grading papers, giving you instant scores without the hassle. Say goodbye to hours of manual work and hello to quick, accurate results!</p>
          <button className="bg-[#262B36] hover:bg-[#1e2430] text-white font-bold py-2 px-4 rounded text-lg">Get Started</button>
        </div>
        <div className="flex-1">
          <img src={landingPagePic} alt="Landing page visual" />
        </div>
      </div>
      {/* Add other sections/components here */}
    </div>
  );
};

export default Landing;
