"use client";
import React, { useState, useEffect } from "react";
import { CreateMenu, NotificationsMenu, MobileTabBar } from "./HeaderActions";
import { getContent } from "../../../api/content/getcontent";
import { BellIcon, CreateIcon, Cross, SearchIcon, Toggle } from "./Icons";
import Link from "next/link";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";
import { navLinks } from "./Helper";


import SideBar from "./SideBar";
import HeaderProfileDropDown from "./HeaderProfileDropDown";
import { Cross1Icon } from "@radix-ui/react-icons";

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [sideNav, setsideNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      router.push("/profile");
    }

    // Fetch content data
  }, [router]);

  // Function to handle the body class based on mobileNav state
  const handleBodyClass = (navOpen) => {
    if (navOpen) {
      document.body.classList.remove("overflow-auto-important");
    } else {
      document.body.classList.add("overflow-auto-important");
    }
  };
  const toggleMobileNav = () => {
    const newNavState = !mobileNav;
    handleBodyClass(newNavState);
    setMobileNav(newNavState);
  };
  const toggleSideNav = () => {
    const newSideState = !sideNav;
    handleBodyClass(newSideState);
    setsideNav(newSideState);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
      setSearchTerm("");
      setIsSearchActive(false);
    }
  };

  // Live search suggestions
  const [catalog, setCatalog] = useState(null);
  useEffect(() => {
    if (!isSearchActive || catalog) return;
    getContent()
      .then((d) => {
        const seen = new Set();
        const items = (d?.collections || [])
          .flatMap((c) => c.items)
          .filter((it) => !seen.has(it.id) && seen.add(it.id));
        setCatalog(items);
      })
      .catch(() => setCatalog([]));
  }, [isSearchActive, catalog]);
  const suggestions =
    catalog && searchTerm.trim()
      ? catalog
          .filter((it) =>
            `${it.title} ${it.type} ${it.content}`.toLowerCase().includes(searchTerm.trim().toLowerCase())
          )
          .slice(0, 6)
      : [];

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      <nav className="!overflow-x-clip">
        <div className="flex relative justify-between items-center px-4 md:px-6 lg:px-9 pt-4 pb-4 md:pb-[18px] ">
          {/* {sideNav && (
            <div
              onClick={toggleSideNav}
              className="fixed h-screen w-full top-0 left-0 z-20 bg-black/50"></div>
          )} */}

          <span className="cursor-none" onClick={toggleSideNav}>
            {/* <Toggle /> */}
            <Link href="/browse" aria-label="StreamFlix">
              <Image
                src="/header/streamflixlogo.svg"
                alt="logo"
                width={200}
                height={37}
                className="inline-block h-[30px] w-[162px] md:h-[37px] md:w-[200px]"
              />
            </Link>
          </span>

          {/* <span
            className={`fixed top-0 left-0 h-screen bg-black/50 z-20 transition-transform transform duration-500 ${
              sideNav ? "translate-x-0" : "-translate-x-[110%]"
            }`}>
            <SideBar toggleSideNav={toggleSideNav} />
          </span> */}
          <div className="hidden lg:flex items-center gap-3.5 sm:gap-2.5">
            {mobileNav && (
              <div
                onClick={toggleMobileNav}
                className="fixed h-screen w-full top-0 left-0 z-[18] bg-black/50"></div>
            )}
            <div
              className={`duration-700 overflow-x-hidden flex flex-col lg:flex-row items-start lg:items-center absolute lg:relative top-[88px] lg:top-auto right-1 lg:right-auto border lg:border-none rounded-lg lg:border-black px-4 w-[170px] lg:w-fit bg-[#1f1f1f] lg:px-0 lg:rounded-full pt-8 lg:py-0 z-[19] 
                ${
                  mobileNav
                    ? ""
                    : "absolute invisible lg:visible translate-x-[100%] lg:translate-x-0"
                }
            `}>
              <span
                onClick={toggleMobileNav}
                className="cursor-pointer absolute right-3 top-3 lg:hidden">
                <Cross />
              </span>
              {!isSearchActive ? (
                <>
                  {navLinks.map((obj, i) => (
                    <Link
                      className={`h-[52px] flex items-center pt-4 lg:py-5 lg:px-8 text-[13px] md:text-[14.52px] font-normal rounded-full underline-hover duration-500 ${
                        i === 3 ? "pb-6 lg:pb-5" : ""
                      } ${
                        pathname === obj.url
                          ? "bg-white text-black"
                          : "text-white hover:bg-white hover:text-black"
                      }`}
                      key={i}
                      href={obj.url}
                      onClick={() => {
                        setMobileNav(false);
                        handleBodyClass(false);
                      }}>
                      {obj.link}
                    </Link>
                  ))}
                  <button
                    onClick={toggleSearch}
                    className="lg:pl-3 pb-8 pt-3 lg:py-5 pr-[33px] hidden cursor-pointer lg:block">
                    <SearchIcon />
                  </button>
                </>
              ) : (
                <div className="relative w-full">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center w-full h-[52px] pt-4 lg:py-5 lg:px-8 rounded-full bg-[#1f1f1f]">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-2 text-white focus:outline-none text-sm lg:text-base placeholder:text-white bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="cursor-pointer">
                    <Cross1Icon className="text-white" />
                  </button>
                </form>
                  {searchTerm.trim() && (
                    <div className="absolute left-0 right-0 top-[60px] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#1f1f1f] shadow-2xl">
                      {suggestions.length === 0 ? (
                        <p className="px-5 py-4 text-sm text-zinc-400">
                          {catalog ? `No results for "${searchTerm.trim()}"` : "Searching..."}
                        </p>
                      ) : (
                        <>
                          {suggestions.map((it) => (
                            <Link
                              key={it.id}
                              href={`/browse/${it.id}`}
                              onClick={() => {
                                setIsSearchActive(false);
                                setSearchTerm("");
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#2b2b2b]">
                              <img src={it.src} alt="" className="h-12 w-20 rounded-md object-cover" />
                              <span className="min-w-0">
                                <span className="block truncate text-sm text-white">{it.title}</span>
                                <span className="block text-xs text-zinc-400 capitalize">{it.type} · {it.content}</span>
                              </span>
                            </Link>
                          ))}
                          <button
                            type="button"
                            onClick={handleSearch}
                            className="w-full border-t border-white/10 px-4 py-3 text-left text-sm text-[#00FF99] hover:bg-[#2b2b2b]">
                            See all results for &quot;{searchTerm.trim()}&quot;
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-7 bg-[#1f1f1f] px-3 md:px-5 rounded-full py-2 lg:py-3.5 h-[56px] z-10">
            <CreateMenu />
            <NotificationsMenu />
            <HeaderProfileDropDown profile={profile} />
            {/* <div className="cursor-pointer lg:hidden" onClick={toggleMobileNav}>
              <Toggle />
            </div> */}
          </div>
        </div>
      </nav>
      <MobileTabBar />
    </>
  );
};

export default Header;
