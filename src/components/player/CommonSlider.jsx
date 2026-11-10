"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { PlayBtnIcon2, AddIcon2 } from "../content/common/Icons";
import { useRouter } from "next/navigation";

const CommonEpisode = ({
  number,
  text,
  addtionalclass,
  sliderEpisodes,
  addtionalclass2,
}) => {
  const router = useRouter();

  const handlePlayEpisode = (episode) => {
    const updatedEpisodes = sliderEpisodes.map((ep) => ({
      ...ep,
      type: "series",
    }));

    sessionStorage.setItem(
      "videoData",
      JSON.stringify({
        ...episode,
        video_id: episode.video_id,
        type: "series",
        episodes: updatedEpisodes,
      })
    );
    router.push(`/watch/${episode.contentId}?trackId=${episode.video_id}`);
  };

  return (
    <>
      <div className=" md:pl-5 md:pr-0">
        <h2 className="pl-5 text-lg font-white font-semibold md:pl-2 inline-block">
          {text}
        </h2>
        <Swiper
          className="slider-1"
          slidesPerView={1}
          spaceBetween={0}
          freeMode={true}
          navigation={true}
          loop={true}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          breakpoints={{
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2.4,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: number,
              spaceBetween: 30,
            },
          }}>
          {sliderEpisodes.map((episode, i) => (
            <SwiperSlide key={i} className={`mt-6 lg:mt-2 ${addtionalclass2}`}>
              <div
                className={`group pt-4 relative overflow-hidden md:hover:scale-[1.1] duration-500 px-4 md:px-3 ${addtionalclass}`}>
                <span className="bg-white/10 rounded-full px-4 py-1 common_para absolute top-7 2xl:top-9 left-6 md:left-5">
                  {episode.episode_index}
                </span>
                <div className="absolute duration-500 bottom-2.5 md:group-hover:bottom-[15px] min-[1600px]::group-hover:bottom-[35px] md:bottom-[-100px] left-[30px] w-full">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm sm:text-base md:text-lg">
                      {episode.title}
                    </h4>
                    <div className="pr-16 flex gap-2.5 justify-center items-center">
                      <button onClick={() => handlePlayEpisode(episode)}>
                        <PlayBtnIcon2 />
                      </button>
                     {/*  <Link href="#">
                        <AddIcon2 />
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="rounded-[10px] overflow-hidden">
                  <Image
                    className="w-full"
                    unoptimized
                    width="379"
                    height="240"
                    src={episode.image_url}
                    alt={episode.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CommonEpisode;
