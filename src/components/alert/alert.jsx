import React from "react";

const Alert = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-auto whitespace-nowrap p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-zinc-900 text-white rounded-[10px] flex flex-col items-center space-y-3 transition-transform transition-opacity duration-500 ease-in-out`}>
      <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2 text-center">
        {message}
      </h2>
      <div className="flex justify-between space-x-3">
        <button
          onClick={onConfirm}
          className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 px-4 py-2 bg-[#00FF99] text-black font-normal rounded-[10px] text-sm sm:text-base md:text-lg">
          Yes
        </button>
        <button
          onClick={onCancel}
          className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 px-4 py-2 bg-red-500 text-white font-normal rounded-[10px] text-sm sm:text-base md:text-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Alert;
