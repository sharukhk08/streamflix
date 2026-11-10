"use client";
import React from "react";
import { Cross } from "./Icons";
import { GenresLinks, sidebarLinks } from "./Helper";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const SideBar = ({ toggleSideNav }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="w-[200px] lg:w-[250px] h-screen overflow-y-auto sidebar-scroll px-4 bg-black text-white ">
        <div
          className="pb-3 pt-8 md:py-10 pl-4 md:pl-6 lg:pl-8 cursor-pointer"
          onClick={toggleSideNav}>
          <Cross />
        </div>
        {sidebarLinks.map((obj, i) => (
          <div key={i} className="flex flex-col">
            <Link
              className={`${
                i === 5 ? "mb-4" : "mb-0"
              } flex items-center gap-5 py-4 md:py-5 sm:px-8 font-semibold text-[13px] px-8 rounded-full underline-hover duration-500 ${
                pathname === obj.url
                  ? "bg-[#1f1f1f] text-white"
                  : "text-white hover:bg-[#1f1f1f]"
              }`}
              href={obj.url}
              onClick={toggleSideNav}>
              {obj.icon}
              {obj.link}
            </Link>
          </div>
        ))}
        <div className="border-t">
          <h5 className="font-semibold text-[13px] pl-10 pt-6">
            Top Categories
          </h5>
          {GenresLinks.map((obj, i) => (
            <div key={i} className="flex flex-col ">
              <Link
                className={`${
                  i === 6 ? "mb-10" : "mb-0"
                } flex items-center gap-5 pl-10 pt-6 font-semibold text-[13px] px-8 rounded-full underline-hover duration-300 ${
                  pathname === obj.url
                    ? "text-white scale-105"
                    : "text-white/80 hover:text-white hover:scale-105"
                }`}
                href={obj.url}
                onClick={toggleSideNav}>
                {obj.link}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
