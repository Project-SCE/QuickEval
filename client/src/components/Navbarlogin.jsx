import React from 'react';
import { Link } from 'react-router-dom';

const Navbarlogin = ({currentPage}) => {
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
    
        <div className="space-x-10 mr-10">
        <Link to="/" className="text-white hover:text-gray-300 text-lg">Home</Link>
        {isSignInPage ? (
          <Link to="/signup" className="bg-[#BE2817] text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 text-lg">Signup</Link>
        ) : (
          <Link to="/login" className="bg-[#BE2817]  text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 text-lg ">Login</Link>
        )}
      </div>

      
      
    </nav>
  );
};

export default Navbarlogin;
