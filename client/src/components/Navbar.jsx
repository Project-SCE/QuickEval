import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center" style={{ backgroundColor: '#486284' }}>
      <div className="text-2xl font-bold text-white">QuickEval</div>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
        <Link to="/about" className="text-white hover:text-gray-300">About</Link>
        <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
        <Link to="/login" className="bg-[#BE2817] text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
