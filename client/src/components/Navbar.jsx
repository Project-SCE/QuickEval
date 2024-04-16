import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mx-auto p-4" style={{ backgroundColor: '#486284', maxWidth: '1400px' }}>
      <div className="text-3xl font-bold">
        <span className="text-white">Quick</span>
        <span className="text-[#BE2817]">Eval</span>
      </div>
      <div className="space-x-10">
        <Link to="/" className="text-white hover:text-gray-300 text-lg">Home</Link>
        <Link to="/about" className="text-white hover:text-gray-300 text-lg">About</Link>
        <Link to="/contact" className="text-white hover:text-gray-300 text-lg">Contact</Link>
        <Link to="/login" className="bg-[#BE2817] text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 text-lg">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
