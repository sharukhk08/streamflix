"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFilm, FiTv, FiBookmark, FiSearch, FiUserPlus, FiList } from "react-icons/fi";
import { BellIcon, CreateIcon } from "./Icons";

// Small popover that closes on outside click or Escape.
function Popover({ label, icon, children, badge }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button type="button" aria-label={label} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="relative cursor-pointer">
        {icon}
        {badge && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#00FF99]" />}
      </button>
      {open && (
        <div onClick={() => setOpen(false)} className="absolute right-[-40px] top-10 z-50 w-64 rounded-2xl border border-white/10 bg-[#252525] p-2 text-sm text-white shadow-2xl">
          {children}
        </div>
      )}
    </div>
  );
}

const Item = ({ href, icon, title, sub }) => (
  <Link href={href} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[#363636]">
    <span className="mt-0.5 text-[#00FF99]">{icon}</span>
    <span>
      <span className="block font-medium">{title}</span>
      {sub && <span className="block text-xs text-zinc-400">{sub}</span>}
    </span>
  </Link>
);

export function CreateMenu() {
  return (
    <Popover label="Create" icon={<CreateIcon />}>
      <Item href="/profile" icon={<FiUserPlus />} title="Add a profile" sub="Create a new viewer profile" />
      <Item href="/browse/my-list" icon={<FiList />} title="My watchlist" sub="Titles you saved" />
      <Item href="/search" icon={<FiSearch />} title="Search" sub="Find a movie or series" />
    </Popover>
  );
}

export function NotificationsMenu() {
  const [read, setRead] = useState(false);
  useEffect(() => {
    try { setRead(localStorage.getItem("demoNotificationsRead") === "1"); } catch {}
  }, []);
  const markRead = () => { setRead(true); try { localStorage.setItem("demoNotificationsRead", "1"); } catch {} };
  return (
    <Popover label="Notifications" icon={<BellIcon />} badge={!read}>
      <div className="flex items-center justify-between px-3 pb-1 pt-1">
        <span className="font-semibold">Notifications</span>
        <button type="button" onClick={(e) => { e.stopPropagation(); markRead(); }} className="text-xs text-[#00FF99]">Mark all read</button>
      </div>
      <Item href="/browse" icon={<FiFilm />} title="New this week" sub="Fresh titles were added to StreamFlix" />
      <Item href="/browse/genres/movie" icon={<FiFilm />} title="Trending movies" sub="See what everyone is watching" />
      <Item href="/browse/my-list" icon={<FiBookmark />} title="Your watchlist" sub="Pick up where you left off" />
    </Popover>
  );
}

// Phone navigation: the top menu is hidden below the lg breakpoint, so show a bottom tab bar.
export function MobileTabBar() {
  const path = usePathname() || "";
  const tabs = [
    { href: "/browse", label: "Home", icon: <FiHome />, match: (p) => p === "/browse" },
    { href: "/browse/genres/movie", label: "Movies", icon: <FiFilm />, match: (p) => p.startsWith("/browse/genres/movie") },
    { href: "/browse/genres/series", label: "Series", icon: <FiTv />, match: (p) => p.startsWith("/browse/genres/series") },
    { href: "/browse/my-list", label: "Watchlist", icon: <FiBookmark />, match: (p) => p.startsWith("/browse/my-list") },
    { href: "/search", label: "Search", icon: <FiSearch />, match: (p) => p.startsWith("/search") },
  ];
  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-black/90 backdrop-blur lg:hidden">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${t.match(path) ? "text-[#00FF99]" : "text-zinc-400"}`}>
            <span className="text-xl">{t.icon}</span>
            {t.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
