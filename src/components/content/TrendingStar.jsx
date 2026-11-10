import React from "react";
import TrendingStarCards from "./TrendingStarCards";
import TrendingStarSlider from "./TrendingStarSlider";
import TrendingStarDropDown from "./TrendingStarDropDown";

const TrendingStar = () => {
  return (
    <>
      <div className="px-3 sm:px-7 pt-10 lg:pt-20">
        <div className="flex items-center justify-between">
          <div></div>
          <div className="text-center">
            <h2 className="font-bold text-[#00FF99] text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] md:leading-[55px] max-w-[1037px] mx-auto">
              Trending Stars
            </h2>
            <p className="pt-3 !leading-[20px] font-bold text-white text-lg md:text-xl 2xl:text-2xl">
              Meet the stars everyone’s talking about!
            </p>
          </div>
          <div>
            <TrendingStarDropDown />
          </div>
        </div>
        <div className="hidden lg:block">
          <TrendingStarCards />
        </div>
        <div className="lg:hidden">
          <TrendingStarSlider />
        </div>
      </div>
    </>
  );
};

export default TrendingStar;
