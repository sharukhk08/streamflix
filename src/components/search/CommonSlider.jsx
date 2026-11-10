"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { PlayBtnIcon2, AddIcon2, CheckIcon, RemoveIcon } from "../content/common/Icons";
import { useRouter } from "next/navigation";

import { addToWatchlist } from "../../api/content/addtowatchlist";
import { getWatchlist } from "../../api/content/getwatchlist.js";
import { removeFromWatchlist } from "../../api/content/removefromwatchlist";

const CommonSlider = ({
  number,
  text,
  addtionalclass,
  sliderImages,
  addtionalclass2,
}) => {
  const router = useRouter();
  const [profileId, setProfileId] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfileId(parsedProfile.profile_id);
      fetchWatchlist(parsedProfile.profile_id);
    }
  }, []);

  const fetchWatchlist = async (profileId) => {
    const result = await getWatchlist(profileId);
    if (result.success) {
      setWatchlist(result.data.map((item) => item.content_id));
    } else {
      console.error("Failed to fetch watchlist:", result.error);
    }
  };

  const handlePlayClick = (id) => {
    router.push(`/browse/${id}`);
  };

  const handleAddToWatchlist = async (contentId) => {
    if (!profileId) {
      console.error("No profile selected");
      return;
    }

    if (watchlist.includes(contentId)) {
      console.log("Already in watchlist");
      return;
    }

    const result = await addToWatchlist(contentId, profileId);
    if (result.success) {
      console.log("Added to watchlist successfully");
      setWatchlist([...watchlist, contentId]);
      router.refresh();
    } else {
      console.error("Failed to add to watchlist:", result.error);
    }
  };

  const handleRemoveFromWatchlist = async (contentId) => {
    if (!profileId) {
      console.error("No profile selected");
      return;
    }

    const result = await removeFromWatchlist(contentId, profileId);
    if (result.success) {
      console.log("Removed from watchlist successfully");
      setWatchlist(watchlist.filter((id) => id !== contentId));
      router.refresh();
    } else {
      console.error("Failed to remove from watchlist:", result.error);
    }
  };

  const isInWatchlist = (contentId) => watchlist.includes(contentId);

  return (
    <>
      <div className="md:pl-5 md:pr-0">
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
          {sliderImages.map((obj, i) => (
            <SwiperSlide key={i} className={`mt-6 lg:mt-2 ${addtionalclass2}`}>
              <div
                className={`group pt-4 relative overflow-hidden md:hover:scale-[1.1] duration-500 px-4 md:px-3 ${addtionalclass}`}>
                <span className="bg-white/10 rounded-full px-4 py-1 common_para absolute top-7 2xl:top-9 left-6 md:left-5 capitalize">
                  {obj.type}
                </span>
                <div className="absolute duration-500 bottom-2.5 md:group-hover:bottom-[15px] min-[1600px]::group-hover:bottom-[35px] md:bottom-[-100px] left-[30px] w-full">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm sm:text-base md:text-lg">
                      {obj.title}
                    </h4>
                    <div className="pr-16 flex gap-2.5 justify-center items-center">
                      <button onClick={() => handlePlayClick(obj.id)}>
                        <PlayBtnIcon2 />
                      </button>
                      <button
                        onClick={() =>
                          isInWatchlist(obj.id)
                            ? handleRemoveFromWatchlist(obj.id)
                            : handleAddToWatchlist(obj.id)
                        }
                        onMouseEnter={() => setHoveredItem(obj.id)}
                        onMouseLeave={() => setHoveredItem(null)}>
                        {isInWatchlist(obj.id) ? (
                          hoveredItem === obj.id ? (
                            <RemoveIcon />
                          ) : (
                            <CheckIcon />
                          )
                        ) : (
                          <AddIcon2 />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="rounded-[10px] overflow-hidden">
                  <Image
                    className="w-full h-auto object-cover"
                    unoptimized
                    width={381}
                    height={240}
                    src={obj.src}
                    alt={obj.title}
                    style={{ aspectRatio: "381 / 240" }}
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

export default CommonSlider;
