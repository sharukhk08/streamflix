// components/notification/notification.jsx
"use client";

//library
import React, { useState, useEffect } from "react";

// components

const Notification = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  if (!show) return null;

  let icon;
  let bgColor;

  if (type === "error") {
    icon = (
      <svg
        className="w-6 h-6 p-1 bg-red-500 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
    bgColor = "bg-red-900";
  } else {
    icon = (
      <svg
        className="w-6 h-6 p-1 bg-green-500 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
    bgColor = "bg-green-900";
  }

  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-auto whitespace-nowrap p-4 bg-zinc-900 text-white rounded-xl shadow-lg flex items-center space-x-3 transition-transform transition-opacity duration-500 ease-in-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
      }}>
      {icon}
      <span className="text-sm sm:text-base flex-1">{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-white hover:text-gray-400 transition-colors duration-200"
        aria-label="Close">
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
