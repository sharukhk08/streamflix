"use client";

import React from "react";
import Header from "../../../components/header/header";
import PrivacyPolicy from "../../../components/legal/PrivacyPolicy";
import Footer from "../../../components/footer/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen h-screen text-white">
      <Header />
      <div className="relative flex flex-col md:flex-row items-start justify-center md:justify-between p-4 md:p-6 lg:px-8 flex-1">
        <div className="relative flex flex-col justify-start items-center w-full p-4 z-10">
          <PrivacyPolicy />
        </div>
      </div>
      <Footer />
    </div>
  );
}
