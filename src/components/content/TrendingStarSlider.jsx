"use client";
import React, { useEffect, useState } from "react";
import { getTrendingStars } from "../../api/content/getTrendingStars";
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import TrendingStarSliderCards from "./TrendingStarSliderCards";

const TrendingStarSlider = () => {
  const [trendingStars, setTrendingStars] = useState({ actors: [], directors: [] });

  useEffect(() => {
    const fetchTrendingStars = async () => {
      const data = await getTrendingStars();
      setTrendingStars(data);
    };
    fetchTrendingStars();
  }, []);

  return (
    <>
      <Swiper
        className="slider-1"
        slidesPerView={1}
        spaceBetween={0}
        freeMode={true}
        navigation={true}
        pagination={{
          clickable: false,
        }}
        loop={true}
        autoplay={{
          delay: 10000, // Set delay to 10000ms (10 seconds) for autoplay
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Navigation, Autoplay]}
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
        }}>
        {trendingStars.actors.map((obj, i) => (
          <SwiperSlide key={i} className={`mt-6 lg:mt-2`}>
            <TrendingStarSliderCards obj={obj} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TrendingStarSlider;
