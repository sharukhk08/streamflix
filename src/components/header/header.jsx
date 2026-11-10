// components/authentication/header.jsx
"use client";

//library
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  
  const isLoginPage = pathname === "/sign-in";
  const buttonText = isLoginPage ? "Sign up" : "Sign in";
  const linkHref = isLoginPage ? "/sign-up" : "/sign-in";

  return (
    <header className="h-16 flex px-8 pt-10 md:px-8 md:pt-10 justify-between">
      {/* Logo Section */}
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

      {/* Navigation and Actions Section */}
      <div className="flex justify-end items-center font-medium gap-2 md:gap-4">
        {/* Languages Option */}
        <select className="text-sm custom-select cursor-pointer p-2 rounded-xl text-white bg-black border-2 border-gray-700 outline-none capitalize">
          <option value="EN">en</option>
          <option value="SP">sp</option>
          <option value="CH">ch</option>
        </select>

        {/* Dynamic Login/Sign Up Button */}
        <Link href={linkHref}>
          <button className="h-10 w-[70px] md:w-[70px] lg:w-[110px] border-2 border-[#00FF99] rounded-xl text-sm md:text-base duration-150 text-white text-ellipsis overflow-hidden">
            {buttonText}
          </button>
        </Link>
      </div>
    </header>
  );
}
