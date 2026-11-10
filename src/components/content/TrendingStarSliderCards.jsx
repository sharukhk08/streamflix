import React from "react";
import Image from "next/image";

const TrendingStarSliderCards = ({ obj }) => {
  return (
    <article className="group pt-6 md:pt-[26px] relative overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out">
      <div className="absolute transition-all duration-500 ease-in-out group-hover:bottom-[20px] bottom-[-100px] left-[30px]">
        <h4 className="text-white font-bold text-lg md:text-2xl min-[1600px]:text-[32px]">
          {obj.name}
        </h4>
        <p className="text-[#00FF99] font-bold text-base md:text-lg min-[1600px]:text-xl pt-1">
          Actor
        </p>
      </div>
      <Image
        className="w-full"
        unoptimized
        width="451"
        height="734"
        src={obj.profile_image_url}
        alt="trending-star-img"
      />
    </article>
  );
};

export default TrendingStarSliderCards;
