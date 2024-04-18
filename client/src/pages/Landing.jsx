import React from 'react';
import Navbar from '../components/Navbar';
import landingPagePic from '../assets/landingpagepic.png'; // Make sure the path is correct

const Landing = () => {
  const gradientStyle = {
    background: "linear-gradient(to right, #3D505E 83%, #828E9C 110%, #FFFFFF 140%)"
  };
  const extensionColor = "#262B36";

  return (
    <div>
      <div style={gradientStyle} className="min-h-screen">
        <Navbar />
        <div className="flex justify-between items-center p-12 h-screen">
          <div className="flex-1">
            <h1 className="text-6xl font-bold mb-4 text-white">NO MORE GRADING HASSLES:</h1>
            <h2 className="text-5xl font-bold mb-4 text-white">SAY HELLO TO INSTANT SCORES!</h2>
            <p className="text-2xl mb-8 text-[#D9D9D9]">Experience the future of grading! Our tool automates the tedious task of grading papers, giving you instant scores without the hassle. Say goodbye to hours of manual work and hello to quick, accurate results!</p>
            <button className="bg-[#262B36] hover:bg-[#1e2430] text-white font-bold py-2 px-4 rounded text-lg">Get Started</button>
          </div>
          <div className="flex-1">
            <img src={landingPagePic} alt="Landing page visual" />
          </div>
        </div>
      </div>
      
      {/* Extension section */}
      <div style={{ background: extensionColor }} className="min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Meet the Team</h2>
          <div className="grid grid-cols-4 gap-8">
            {/* Team members */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">JOBIN TOM</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">MUHAMED ADIL</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">JUMANA JOUHAR</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            {/* New Team Member */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">JIYA MARY JOBY</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div className="bg-[#262B36] py-12">
  <div className="container mx-auto px-4 text-center">
    <div className="w-3/4 mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-transparent p-4"></div> {/* Invisible square box */}
        <h2 className="text-4xl font-bold mb-8 text-white" style={{ background: extensionColor }}>About Us</h2>
        <p className="text-white">At QuckEval, we believe in the transformative power of education and technology working hand in hand. Our mission is to enhance the learning experience for students and educators alike with innovative, reliable, and easy-to-use grading solutions. We are dedicated to providing tools that offer precise assessments, insightful feedback, and empower educators to focus on what they do best — teaching.</p>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Landing;
