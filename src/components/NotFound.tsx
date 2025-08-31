import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo_dye-50 to-platinum-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl border border-platinum-300 p-8 max-w-md w-full text-center">
        <div className="text-9xl mb-6 text-caribbean_current-500">404</div>
        
        <h1 className="text-2xl font-bold text-indigo_dye-700 mb-4">Page Not Found</h1>
        
        <p className="text-jet-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-caribbean_current-500 hover:bg-caribbean_current-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full border border-platinum-300 text-jet-600 hover:bg-platinum-50 py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-platinum-200">
          <p className="text-sm text-jet-500">
            Need help? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;