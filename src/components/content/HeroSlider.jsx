"use client";
import React, { useEffect, useRef, useState } from "react";
import { go } from "../../lib/nav";
import { useRouter } from "next/navigation";
import { attachVideo } from "../../lib/video";
import {
  AudioIcon,
  MuteIcon,
  PlayBtnIcon,
  RightArrowIcon,
  SeriesratingIcon,
} from "./common/Icons";

const HeroSlider = ({ obj, audioOn, handleAudioToggle, isActive = true}) => {
  const router = useRouter();
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const videoId = obj.type === "series" && obj.episodes && obj.episodes.length > 0
      ? obj.episodes[0].video_id
      : obj.video_id;

    if (!isActive) return undefined;
    let detach = () => {};
    if (videoRef.current && videoId) {
      attachVideo(videoRef.current, videoId, { autoplay: true }).then((d) => { detach = d; });
    }
    setIsVideoReady(true);
    return () => detach();
  }, [obj, isActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !audioOn;
    }
  }, [audioOn, isVideoReady]);

  const handlePlayClick = (id) => {
    go(router, `/browse/${id}`);
  };

  return (
    <>
      <article className="relative duration-300 group lg:group-hover:disabled video-layer overflow-hidden">
        <video
          ref={videoRef}
          preload="metadata"
          poster={obj.image_url?.startsWith("/demo/") ? obj.image_url.replace("/demo/poster-", "/demo/backdrop-") : undefined}
          className="rounded-xl md:rounded-3xl xl:rounded-[50px] relative w-full object-cover xl:h-[75vh]"
          playsInline
          loop
          muted={!audioOn}
        />
        <div className="absolute duration-300 bottom-8 md:bottom-[48px] left-[20px] md:left-[40px] xl:left-[60px] z-10">
          <div className="lg:flex items-center gap-2.5 hidden">
            <span className="bg-white/10 rounded-full px-4 py-1 capitalize common_para">
              New {obj.type}
            </span>
            <span className="flex items-center gap-1 text-white text-sm ff_jost">
              <SeriesratingIcon />
              {obj.rating}.0
            </span>
          </div>
          <h1 className="text-white font-semibold text-lg md:text-2xl lg:text-[50px] min-[1600px]:text-6xl pt-3 lg:pt-5">
            {obj.title}
          </h1>
          <p className="hidden md:block font-normal text-white text-[8px] md:text-xs lg:text-sm min-[1600px]:text-base md:pt-3 lg:pt-5 max-w-[240px]  md:max-w-[450px] lg:max-w-[490px] min-[1600px]:max-w-[551px]">
            {obj.description}
          </p>
          <div className="md:flex items-center gap-[13px] font-semibold text-white !text-[13px] pt-2.5 lg:pt-3.5 hidden ">
            {obj.type === "series" ? (
              <p>{obj.seasons} Seasons</p>
            ) : obj.type === "movie" ? (
              <p>{obj.duration}</p>
            ) : null}
            <span className="bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
            <p>{obj.releaseDate}</p>
            <span className="bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
            <p>TV-{obj.maturityRating}</p>
            <span className="bg-[#5F5F5F] w-[3px] h-[3px] rounded-full"></span>
            <p className="capitalize">
              {obj.categories[0] && obj.categories[1]
                ? `${obj.categories[0]} & ${obj.categories[1]}`
                : obj.categories[0] || obj.categories[1]}
            </p>
          </div>
          <div className="flex items-center gap-1.5 md:gap-3 pt-1.5 md:pt-3 lg:pt-[22px]">
            <button
              onClick={() => handlePlayClick(obj.id)}
              className="flex items-center group justify-between gap-3 px-2.5 py-2 md:px-6 lg:px-[30px] md:py-3.5 lg:py-[17px] font-semibold tracking-wide text-xs md:text-sm xl:text-base text-black bg-white border border-white rounded-xl md:rounded-[48px] overflow-hidden relative">
              <PlayBtnIcon />
              Watch Now
            </button>
            <button className="flex items-center group justify-between gap-3 px-2.5 py-2 md:px-6 lg:px-[30px] md:py-3.5 lg:py-[17px] font-semibold tracking-wide text-xs md:text-sm xl:text-base text-white bg-transparent border border-white/20 rounded-xl md:rounded-[48px]">
              More Info
              <RightArrowIcon />
            </button>
          </div>
        </div>
        <button
          onClick={handleAudioToggle}
          className="absolute bottom-8 xl:bottom-[48px] right-[17px] md:right-[25px] z-10">
          {audioOn ? <AudioIcon /> : <MuteIcon />}
        </button>
      </article>
    </>
  );
};

export default HeroSlider;