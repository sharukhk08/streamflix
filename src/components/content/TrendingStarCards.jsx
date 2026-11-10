import React, { useEffect, useState } from "react";
import { getTrendingStars } from "../../api/content/getTrendingStars";
import Image from "next/image";

const TrendingStarCards = () => {
  const [trendingStars, setTrendingStars] = useState({
    actors: [],
    directors: [],
  });

  useEffect(() => {
    const fetchTrendingStars = async () => {
      const data = await getTrendingStars();
      setTrendingStars(data);
    };
    fetchTrendingStars();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-wrap">
        {trendingStars.actors.map((obj, i) => (
          <article
            key={i}
            className="group pt-6 md:pt-[26px] sm:w-6/12 lg:w-3/12 relative overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out">
            <div className="absolute transition-all duration-500 ease-in-out group-hover:bottom-[20px] bottom-[-100px] left-[30px]">
              <h4 className="text-white font-bold text-lg md:text-2xl min-[1600px]:text-[32px]">
                {obj.name}
              </h4>
              <p className="text-[#00FF99] font-bold text-base md:text-lg min-[1600px]:text-xl pt-1">
                Actor
              </p>
            </div>
            <div className="overflow-hidden p-2">
              <Image
                className="w-full rounded-[10px]"
                unoptimized
                width="451"
                height="734"
                src={obj.profile_image_url}
                alt="trending-star-img"
                style={{ aspectRatio: "451 / 734" }}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default TrendingStarCards;
