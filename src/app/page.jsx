"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Play,
  Film,
  Tv2,
  Award,
  Smartphone,
  Laptop,
  Globe2,
  Check,
  Tablet,
  MonitorSmartphone,
} from "lucide-react";

import Slider from "../components/landing/Slider";
import DeviceCard from "../components/landing/DeviceCard";

import Footer from "../components/footer/footer";

export default function LandingPage() {
  const devices = [
    {
      icon: Smartphone,
      name: "Mobile",
      description: "Take your entertainment everywhere",
      features: ["Offline downloads", "Picture-in-picture", "Mobile-optimized"],
    },
    {
      icon: Laptop,
      name: "Web",
      description: "Watch directly in your browser",
      features: ["HD streaming", "Multiple profiles", "Resume watching"],
    },
    {
      icon: MonitorSmartphone,
      name: "Smart TV",
      description: "The ultimate home experience",
      features: ["4K Ultra HD", "Dolby Atmos", "Multi-room streaming"],
    },
    {
      icon: Tablet,
      name: "Tablet",
      description: "Perfect for on-the-go viewing",
      features: ["Split screen", "Family sharing", "Touch controls"],
    },
  ];

  return (
    <div className="h-min-screen text-white">
      {/* Header */}
      <header className="h-16 flex px-8 pt-10 md:px-8 md:pt-10 justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/browse" aria-label="StreamFlix">
            <Image
              src="/header/streamflixlogo.svg"
              alt="logo"
              width={200}
              height={37}
              className="inline-block h-[30px] w-[162px] md:h-[37px] md:w-[200px]"
            />
          </Link>
        </div>
        <div className="flex justify-end items-center font-medium gap-2 md:gap-4">
          <Link href="/sign-in">
            <button className="h-10 w-[70px] md:w-[70px] lg:w-[110px] border-2 border-[#00FF99] rounded-xl text-sm md:text-base duration-150 text-white text-ellipsis overflow-hidden">
              Join Us
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 mb-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight relative">
          Unlimited Entertainment,
          <br />
          <span className="text-[#00FF99]">Anytime, Anywhere</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 relative">
          Stream thousands of movies, TV shows, and exclusive originals
        </p>
        <button className="bg-[#00FF99] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#00FF99]/80 transition-colors relative">
          Always Free
        </button>
      </div>
      
      <div className="relative flex flex-col md:flex-row items-start justify-center md:justify-between p-4 md:p-6 lg:px-8 flex-1">
        <div className="relative flex justify-start items-center w-full p-4 z-10">
          <Slider />
        </div>
      </div>

      <Footer />
    </div>
  );
}
