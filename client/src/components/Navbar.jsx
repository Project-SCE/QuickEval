import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPage, user }) => {
  // If the user is logged in, `user` will have user-related data
  
  const isLoggedIn = user != null;
  const userInitial = isLoggedIn ? user[0].toUpperCase() : 'k';

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
        <Link to="/" className={`text-white hover:text-gray-300 text-lg ${!isLoggedIn && 'hidden'}`}>Home</Link>
        <Link to="/about" className="text-white hover:text-gray-300 text-lg">About</Link>
        <Link to="/contact" className="text-white hover:text-gray-300 text-lg">Contact</Link>

        {isLoggedIn && (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center uppercase font-bold text-white">
              {userInitial}
            </div>
          </div>
        )}
        {!isLoggedIn && (
          // Links to display when user is not logged in
          <Link to="/login" className="bg-[#BE2817]  text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 text-lg ">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
