import React from 'react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-10 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#a589f5] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
