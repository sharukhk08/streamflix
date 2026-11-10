import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/content/ui/dropdown-menu";
import { FilterIcon } from "./common/Icons";
const TrendingStarDropDown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <FilterIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-[9px] bg-[#252525] border-none w-[170px] h-[177px] rounded-[25px] left-[-160px] md:!left-[-140px] fixed top-[9px]">
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] cursor-pointer text-base font-normal pl-3 py-[11px] w-[145px] h-[38px]">
            Trending Stars
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] cursor-pointer text-base font-normal pl-3 py-[11px] w-[145px] h-[38px]">
            Rising Stars
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] cursor-pointer text-base font-normal pl-3 py-[11px] w-[145px] h-[38px]">
            Recently added
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:!text-white hover:!bg-[#363636] rounded-[50px] cursor-pointer text-base font-normal pl-3 py-[11px] w-[145px] h-[38px]">
            Score
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TrendingStarDropDown;
