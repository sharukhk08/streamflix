import Link from "next/link";
import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TiTokIcon,
  TwitterIcon,
} from "../content/common/Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full">
      <div className="px-4 flex flex-col-reverse items-center justify-center pb-[30px] opacity-40 md:py-[36px] ff_lato">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row flex-wrap items-center justify-center gap-2 md:gap-3 font-normal text-[#707070] text-xs md:!text-base text-center">
          <p className="col-span-1 sm:col-span-2 md:col-span-1">
            {currentYear} All rights reserved
          </p>
          <span className="hidden md:block bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
          <Link
            href="/terms-of-service"
            className="duration-500 hover:scale-110">
            <p>Terms of Service</p>
          </Link>
          <span className="hidden md:block bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
          <Link href="/privacy-policy" className="duration-500 hover:scale-110">
            <p>Privacy Policy</p>
          </Link>
          <span className="hidden md:block bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
          <Link
            href="/forgot-password"
            className="duration-500 hover:scale-110">
            <p>Forgot Password</p>
          </Link>
          <span className="hidden md:block bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
          <p>Copyright</p>
        </div>
        <div className="flex flex-wrap items-center justify-center my-6 lg:pt-[22px] gap-5 xl:gap-[30px]">
          <Link
            href="https://x.com/?lang=en"
            target="_blank"
            className="duration-500 hover:scale-110">
            <TwitterIcon />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            className="duration-500 hover:scale-110">
            <InstagramIcon />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            className="duration-500 hover:scale-110">
            <FacebookIcon />
          </Link>
          <Link
            href="https://www.tiktok.com/"
            target="_blank"
            className="duration-500 hover:scale-110">
            <TiTokIcon />
          </Link>
        </div>
      </div>
      <p className="px-4 pb-6 text-center text-[11px] leading-relaxed text-zinc-600">
        Portfolio demo. Films from the Blender open movie projects (Elephants Dream, Big Buck Bunny, Sintel, Tears of Steel, Cosmos Laundromat, Coffee Run, Sprite Fright, Charge), &copy; Blender Foundation / Blender Studio, licensed CC BY 3.0 / 4.0. Sample videos are free public clips.
      </p>
    </footer>
  );
};

export default Footer;
