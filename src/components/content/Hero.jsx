"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade"; // Import fade effect styles
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules"; // Import EffectFade module
import HeroSlider from "./HeroSlider";

import { getFeaturedContentIds } from "../../api/content/getcontent";
import { getSpecificContent } from "../../api/content/getspecificcontent";


const Hero = () => {
  const [audioOn, setAudioOn] = useState(false);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      const featuredIds = await getFeaturedContentIds();
      const featuredDetails = await Promise.all(
        featuredIds.map(async (id) => {
          const content = await getSpecificContent(id);
          return content ? { ...content, id } : null;
        })
      );
      setFeaturedContent(featuredDetails.filter(Boolean));
    } catch (error) {
      console.error("Error fetching featured content:", error);
    }
  };

  const handleAudioToggle = () => {
    setAudioOn((prevAudioOn) => !prevAudioOn);
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
        const videos = document.querySelectorAll("video");
        videos.forEach((video, index) => {
          if (index === swiper.activeIndex) {
            video.play().catch(() => {});
            video.muted = !audioOn;
          } else {
            video.pause();
            video.muted = true;
          }
        });
      };

      swiperInstance.on('slideChange', handleSlideChange);

      return () => {
        swiperInstance.off('slideChange', handleSlideChange);
      };
    }
  }, [audioOn]);

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video, index) => {
      if (index === activeIndex) {
        video.muted = !audioOn;
      } else {
        video.muted = true;
      }
    });
  }, [audioOn, activeIndex]);

  return (
    <>
      <div className="relative px-0 sm:px-4 md:px-6 lg:px-9 pb-2">
        <Swiper
          ref={swiperRef}
          pagination={{ clickable: true }}
          navigation={true}
          effect="fade"
          modules={[Navigation, Autoplay, EffectFade, Pagination]}
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
        >
          {featuredContent.map((content, index) => (
            <SwiperSlide key={content.id}>
              <HeroSlider
                obj={content}
                isActive={index === activeIndex}
                audioOn={audioOn && index === activeIndex}
                handleAudioToggle={handleAudioToggle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;
