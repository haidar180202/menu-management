// components/LoadingSpinner.tsx
import React from 'react';

export const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-center mt-2">Loading...</p>
    </div>
  </div>
);

