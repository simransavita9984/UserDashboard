import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo_dye-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center relative">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-xl font-bold text-white hover:text-platinum-200 transition-colors">
          USER DASHBOARD
          </Link>
        </div>
        
    
        <nav className="ml-auto">
          <Link 
            to="/create" 
            className="
              /* Mobile Styling */
              w-10 h-10 rounded-full
              flex items-center justify-center
              
              /* Desktop Styling */
              sm:w-auto sm:px-4 sm:py-2 sm:rounded-md
              
              /* Common Styling */
              bg-caribbean_current-500 hover:bg-caribbean_current-600
              text-white
              transition-all duration-200
              shadow-md hover:shadow-lg
            "
          >
        
            <span className="text-lg font-bold">+</span>
            <span className="hidden sm:inline ml-2">Create User</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
