import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-platinum-300 border-t-caribbean_current-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-caribbean_current-500 text-lg">⏳</span>
        </div>
      </div>
    
      <div className="mt-4 text-center">
        <p className="text-indigo_dye-700 font-medium">Loading</p>
        <p className="text-jet-600 text-sm mt-1">Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;