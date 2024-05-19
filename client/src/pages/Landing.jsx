import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import landingPagePic from '../assets/landingpagepic.png'; // Make sure the path is correct

const Landing = () => {
  const gradientStyle = {
    background: "linear-gradient(to right, #1F2933, #3d525e 80%, #959EAD 120%)"
  };
  const extensionColor = "#262B36";

  return (
    <div>
      <div style={gradientStyle} className="min-h-screen">
        <Navbar/>
        <div className="flex justify-between items-center p-12 h-screen">
          <div className="flex-1">
            <h1 className="text-6xl font-bold mb-4 text-white">NO MORE GRADING HASSLES:</h1>
            <h2 className="text-5xl font-bold mb-4 text-white">SAY HELLO TO INSTANT SCORES!</h2>
            <p className="text-2xl mb-8 text-[#D9D9D9]">Experience the future of grading! Our tool automates the tedious task of grading papers, giving you instant scores without the hassle. Say goodbye to hours of manual work and hello to quick, accurate results!</p>
            <button  className="bg-[#BE2817] hover:bg-red-950 text-white font-bold py-2 px-4 rounded text-lg"><Link to="/signup">Get Started</Link></button>
          </div>
          <div className="flex-1">
            <img src={landingPagePic} alt="Landing page visual" />
          </div>
        </div>
      </div>

      <div className="bg-[#262B36] py-12">
      <div className="container mx-auto px-4 text-center">
      <div className="w-3/4 mx-auto">
      <div className="relative">
        <div id="about-us" className="absolute inset-0 bg-transparent p-4"></div> {/* Invisible square box */}
        <h2 className="text-4xl font-bold mb-8 text-white" style={{ background: extensionColor }}>About Us</h2>
        <p className="text-white">At QuickEval, we believe in the transformative power of education and technology working hand in hand. Our mission is to enhance the learning experience for students and educators alike with innovative, reliable, and easy-to-use grading solutions. We are dedicated to providing tools that offer precise assessments, insightful feedback, and empower educators to focus on what they do best — teaching.</p>
      </div>
    </div>
    </div>
</div>

      {/* Extension section */}
      <div id="meet-the-team" style={{ background: extensionColor }} className="min-height: 50vh flex flex-col justify-center">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Meet the Team</h2>
          <div className="grid grid-cols-4 gap-12">
            {/* Team members */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">JOBIN TOM</h3>
              <p className="text-gray-600">A technology enthusiast working on my web development skills</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="https://github.com/jobint001"><img src="src/assets/github.png" alt="github" width="40" height="40" style={{marginLeft:'55px', marginRight: '20px' }}/></a>
              <a href="https://www.linkedin.com/in/jobintomofficial"><img src="src/assets/image.png" alt="linkedin" width="40" height="40"/></a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">MUHAMED ADIL</h3>
              <p className="text-gray-600">CSE undergrad with a passion for Data Science, ML and web development</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="https://github.com/adilzubair"><img src="src/assets/github.png" alt="github" width="40" height="40" style={{marginLeft:'55px', marginRight: '20px' }}/></a>
              <a href="https://www.linkedin.com/in/muhamedadil"><img src="src/assets/image.png" alt="linkedin" width="40" height="40"/></a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">JUMANA JOUHAR</h3>
              <p className="text-gray-600">Third year CSE student with a passion for AI/ML and Data Analytics.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="https://github.com/jumanajouhar"><img src="src/assets/github.png" alt="github" width="40" height="40" style={{marginLeft:'55px', marginRight: '20px' }}/></a>
              <a href="https://www.linkedin.com/in/jumana-jouhar"><img src="src/assets/image.png" alt="linkedin" width="40" height="40"/></a>
              </div>
            </div>
            {/* New Team Member */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">JIYA MARY JOBY</h3>
              <p className="text-gray-600">I'm a third-year BTech student passionate about web development and ML.</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="https://github.com/jiya42"><img src="src/assets/github.png" alt="github" width="40" height="40" style={{marginLeft:'55px', marginRight: '20px' }}/></a>
              <a href="https://www.linkedin.com/in/jiya-mary-joby"><img src="src/assets/image.png" alt="linkedin" width="40" height="40"/></a>
              </div>
            </div>
          </div>
        </div>
    

      </div>
    </div>
  );
};

export default Landing;
