"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { getSpecificContent } from "../../../api/content/getspecificcontent";
import CommonSlider from "../../../components/player/CommonSlider";
import LoadingScreen from "../../../components/loading/loadingScreen";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  SeriesratingIcon,
  PlayBtnIcon3,
  AudioIcon,
  MuteIcon,
  PlayBtnIcon,
  WatchlistIcon,
  Cross2,
} from "../../../components/content/common/Icons";

import { MdCross } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BrowseContentPage() {
  const { id } = useParams();
  const [specificContent, setSpecificContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const router = useRouter();
  const sliderRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await getSpecificContent(id);
      setSpecificContent(data);
    } catch (error) {
      console.error("Error fetching content: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Function to handle click outside the slider
    const handleClickOutside = (event) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        setShowEpisodes(false); // Close the slider if clicked outside
      }
    };

    if (showEpisodes) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEpisodes]);

  if (isLoading) return <LoadingScreen />;
  if (!id || !specificContent) return null;

  const {
    title,
    description,
    releaseDate,
    duration,
    rating,
    maturityRating,
    image_url,
    categories,
    cast,
    episodes,
    seasons,
    type,
    video_id,
  } = specificContent;

  const isSmallScreen = window.innerWidth < 768;

  const handleWatchNowClick = () => {
    const first = type === "series" && episodes?.length ? episodes[0] : null;
    const startVideo = first ? first.video_id : video_id;
    const contentData = {
      contentId: id || "",
      title: title || "",
      type: type || "",
      video_id: startVideo || "",
      ...(first ? { episodes, episode_id: first.episode_id, season_number: first.season_number, episode_number: first.episode_number } : {}),
    };

    sessionStorage.setItem("videoData", JSON.stringify(contentData));
    router.push(`/watch/${id}?trackId=${startVideo}`);
  };

  const handleSliderClick = () => {
    setShowEpisodes(true); // Show the slider and move content up
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {isSmallScreen ? (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
          <button
            type="button"
            className="absolute z-40 top-4 left-4 md:top-8 md:left-8 bg-zinc-900 text-white p-3 text-xl rounded-full hover:bg-zinc-800"
            onClick={handleBack}>
            <Cross2 />
          </button>
          <div className="relative h-screen w-full">
            <Image
              src="/images/landingpage-1.png"
              alt={title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />

            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.99) 75%, rgba(0,0,0,1) 100%)",
              }}
            />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 py-20 text-white">
            <div className="flex flex-col justify-center align-middle space-y-6">
              <h1 className="text-3xl font-extrabold text-center">{title}</h1>
              <div className="flex flex-row justify-center items-center gap-2.5 z-30 overflow-x-auto">
                <div className="flex items-center gap-[13px] font-medium text-[#9E9E9E] text-sm">
                  {type === "series" && (
                    <>
                      <p className="sm:hidden">{seasons} {seasons === 1 ? "Season" : "Seasons"}</p>
                      <p className="hidden sm:block">{seasons} {seasons === 1 ? "Season" : "Seasons"}</p>
                    </>
                  )}
                  {type === "movie" && (
                    <>
                      <p className="hidden sm:block">{duration}</p>
                    </>
                  )}
                  <span className="bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                  <p className="">{releaseDate}</p>
                  <span className="hidden sm:block bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                  <p className="hidden sm:block">TV-{maturityRating}</p>
                  <span className="hidden sm:block bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                  <p className="hidden sm:block capitalize">
                    {categories[0] && categories[1]
                      ? `${categories[0]} & ${categories[1]}`
                      : categories[0] || categories[1]}
                  </p>
                  <span className="bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                  <span className="flex items-center font-normal gap-1 text-white text-sm ff_jost">
                    <SeriesratingIcon />
                    {rating}.0
                  </span>
                </div>
              </div>
              <button
                onClick={handleWatchNowClick}
                className="bg-[#00FF99] text-black font-semibold text-base w-full py-3 rounded">
                Watch now
              </button>
              <button
                onClick={() => router.push("/browse")}
                className="mt-3 w-full rounded border border-white/30 py-3 text-base font-medium text-white">
                Explore more titles
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
          {image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundColor: "black",
                backgroundImage: image_url.startsWith("/demo/")
                  ? `url(${image_url.replace("/demo/poster-", "/demo/backdrop-")})`
                  : undefined,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
          <div className="relative z-10 flex-grow p-6 text-white">
            <div className="z-10">
              <button
                type="button"
                className="absolute top-4 left-4 md:top-8 md:left-8 bg-zinc-900 text-white p-3 text-xl rounded-full hover:bg-zinc-800"
                onClick={handleBack}>
                <Cross2 />
              </button>
              <div
                className={`flex flex-col mt-[13rem] ml-[5rem] transition-transform duration-500 ${
                  showEpisodes ? "translate-y-[-30%]" : "translate-y-0"
                }`}>
                <div className="lg:flex items-center gap-2.5">
                  <div className="md:flex items-center gap-[13px] font-medium text-[#9E9E9E] text-sm">
                    {type === "series" ? (
                      <p>{seasons} {seasons === 1 ? "Season" : "Seasons"}</p>
                    ) : type === "movie" ? (
                      <p>{duration}</p>
                    ) : null}
                    <span className="bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                    <p>{releaseDate}</p>
                    <span className="bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                    <p>TV-{maturityRating}</p>
                    <span className="bg-[#9E9E9E] w-[3px] h-[3px] rounded-full"></span>
                    <p className="capitalize">
                      {categories[0] && categories[1]
                        ? `${categories[0]} & ${categories[1]}`
                        : categories[0] || categories[1]}
                    </p>
                    <span className="flex items-center font-normal gap-1 text-white text-sm ff_jost">
                      <SeriesratingIcon />
                      {rating}.0
                    </span>
                  </div>
                </div>
                <h1 className="text-white font-semibold text-lg md:text-2xl lg:text-[40px] min-[1600px]:text-5xl pt-1 lg:pt-3 overflow-wrap: break-word">
                  {title}
                </h1>
                <p className="hidden md:block font-light text-white text-[8px] md:text-xs lg:text-sm min-[1600px]:text-base md:pt-3 lg:pt-5 max-w-[240px] md:max-w-[450px] lg:max-w-[490px] min-[1600px]:max-w-[551px]">
                  {description}
                </p>

                <div className="mt-3">
                  <p className="text-white font-semibold text-sm mb-5">
                    Cast:{" "}
                    {cast.map((actor, index) => (
                      <span
                        key={index}
                        className="text-white text-sm font-normal">
                        {actor}
                        {index < cast.length - 1 ? ", " : ""}
                      </span>
                    ))}{" "}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 md:gap-3 pt-1.5 md:pt-3 lg:pt-[22px]">
                  <button
                    onClick={handleWatchNowClick}
                    className="flex items-center group justify-between gap-3 px-2.5 py-2 md:px-6 lg:px-[30px] md:py-3.5 lg:py-[17px] font-semibold tracking-wide text-xs md:text-sm xl:text-base text-black bg-white border border-white rounded-xl md:rounded-[48px] overflow-hidden relative">
                    <PlayBtnIcon />
                    Watch Now
                  </button>
                  <button className="flex items-center group justify-between gap-3 px-2.5 py-2 md:px-6 lg:px-[30px] md:py-3.5 lg:py-[17px] font-semibold tracking-wide text-xs md:text-sm xl:text-base text-white bg-transparent border border-white/20 rounded-xl md:rounded-[48px]">
                    Watchlist
                    <WatchlistIcon />
                  </button>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button onClick={handleWatchNowClick}>
                    <PlayBtnIcon3 />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setAudioOn(!audioOn)}
                className="absolute bottom-8 right-8 z-10">
                {audioOn ? <AudioIcon /> : <MuteIcon />}
              </button>

              {type === "series" && (
                <div
                  ref={sliderRef}
                  className={`fixed left-0 right-0 mx-auto transition-all duration-500 ease-in-out transform px-16 ${
                    showEpisodes ? "translate-y-0" : "translate-y-[70%]"
                  }`}
                  onClick={handleSliderClick}>
                  <CommonSlider
                    sliderEpisodes={episodes.map((episode) => ({
                      ...episode,
                      image:
                        episode.thumbnail || "/path/to/default/thumbnail.jpg",
                      contentId: id,
                      title: `${episode.title}`,
                      episode_index: `S${episode.season_number} E${episode.episode_number}`,
                    }))}
                    number={4.2}
                    text="Episodes"
                    addtionalclass="common-slider-w"
                    addtionalclass2="custum-w-slider"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
