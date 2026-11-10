// login.jsx
"use client";

// library
import React from "react";

// components
import LoginForm from "../../../components/authentication/loginForm";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen h-screen text-white">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="relative flex flex-col md:flex-row items-start justify-center md:justify-between p-4 md:p-6 lg:px-8 flex-1">
        <div className="relative flex flex-col justify-start items-center w-full p-4 z-10">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
