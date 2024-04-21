import React from 'react';
import { useAuth } from '../Authcontext';  // Adjust the import path as necessary
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const { currentUser } = useAuth();
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Logged out successfully");
        navigate("/");
      }).catch((error) => {
        // An error happened.
        console.error("Logout error:", error);
      });
    };
  
    return (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="px-4 py-2">
            <p className="border-b border-gray-200 pb-2 mb-2">
              Hello, <strong>{currentUser.displayName || 'User'}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="w-full text-center px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-500 rounded transition-colors duration-200 ease-in-out"
            >
              Log Out
            </button>
          </div>
        </div>
      );
  };
  
export default UserMenu;
