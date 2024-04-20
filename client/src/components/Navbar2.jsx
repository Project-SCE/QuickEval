import React from 'react';
import { Link } from 'react-router-dom';

const Navbar2 = () => {
  return (
    <nav className="flex justify-between items-center mx-auto p-4" style={{ backgroundColor: '#FFFFFF', Width: '100%', borderBottom: '2px solid #3d525e' }}>
      <div className="text-3xl font-bold font-jakarta-sans">
        <span className="text-black">Quick</span>
        <span className="text-black">Eval</span>
      </div>
      <div className="space-x-10">
        <Link to="/" className="text-black hover:text-gray-300 text-lg">Home</Link>
        <Link to="/signin" className="bg-[#3d525e] text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 text-lg">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar2;
