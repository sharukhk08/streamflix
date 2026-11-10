import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

// Logic
import { signOut } from "../../../api/authentication/signout";

const HeaderProfileDropDown = ({ profile }) => {
 1
  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("selectedProfile");    
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {profile?.profile_image && (
            <Image
              className="w-[27px] md:w-[31px] h-[27px] md:h-[31px] rounded-full object-cover"
              unoptimized
              width={31}
              height={31}
              src={profile?.profile_image}
              alt={profile?.profile_name || "Profile Image"}
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-[9px] bg-[#252525] border-none w-[132px] h-[177px] rounded-[15px] absolute -right-7 top-7">
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] text-base font-normal cursor-pointer pl-3 py-2.5 w-[112px] h-[38px]">
            <Link href="/account">Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] text-base font-normal cursor-pointer pl-3 py-[11px]  w-[112px] h-[38px]">
            <Link href="/profile">Profiles</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] text-base font-normal cursor-pointer pl-3 py-[11px]  w-[112px] h-[38px]">
            <Link href="/help">Get Help</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] text-base font-normal cursor-pointer pl-3 py-[11px]  w-[112px] h-[38px]">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeaderProfileDropDown;
