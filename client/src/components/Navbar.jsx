import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useAuth } from '../Authcontext';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { currentUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const userInitial = currentUser && currentUser.displayName ? currentUser.displayName.charAt(0) : 'N/A';

  const gradientStyle = {
    background: "linear-gradient(to right, #1F2933, #3d525e 80%, #959EAD 120%)",
    maxWidth: "100vw"
  };

  return (
    <nav className="flex justify-between items-center mx-auto p-4 z=1" style={gradientStyle}>
      <div className="text-3xl font-bold">
        <span className="text-white ml-8">Quick</span>
        <span className="text-[#BE2817]">Eval</span>
      </div>
      <div className="flex items-center space-x-8 mr-10">
        <Link to="/#about-us" className="text-white hover:text-gray-300 text-lg">About</Link>
        <Link to="/#meet-the-team" className="text-white hover:text-gray-300 text-lg">Contact</Link>
        {currentUser && (
          <Link to="/evaluator" className="text-white hover:text-gray-300 text-lg">Evaluators</Link>
        )}
        {currentUser && (
          <div className="flex relative items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center uppercase font-bold text-white"
             onClick={toggleMenu}
             style={{ userSelect: 'none' }}
             >
              {userInitial}
            </div>
            {showMenu && <UserMenu />}
          </div>
        )}
        {!currentUser && (
          <Link to="/login" className="bg-[#BE2817]  text-white px-4 py-2 rounded hover:bg-red-800 transition duration-300 text-lg">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
