import React from 'react';
import { Link } from 'react-router-dom';

const Navbarnormal = ({currentPage}) => {
  // Check if the current page is 'signin', if so, show 'Signup' instead of 'Login'
  const isSignInPage = currentPage === 'signin';
  
  const user = "john"
  const userInitial = user && user.name ? user.name.charAt(0) : 'j';
  const gradientStyle = {
    background: "linear-gradient(to right, #1F2933, #3d525e 80%, #959EAD 120%)",
    maxWidth: "100vw"
  };

  return (
    <nav className="flex justify-between items-center mx-auto p-4" style={gradientStyle}>
      <div className="text-3xl font-bold">
        <span className="text-white ml-8">Quick</span>
        <span className="text-[#BE2817]">Eval</span>
      </div>
    
        <div className="flex items-center space-x-4 mr-10">
        <Link to="/" className="text-white hover:text-gray-300 text-lg">Home</Link>
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center uppercase font-bold text-white">
              {userInitial}
            </div>
          </div>
      </div>

      
      
    </nav>
  );
};

export default Navbarnormal;
