// components/loading/loadingScreen.jsx
"use client"

//library
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
