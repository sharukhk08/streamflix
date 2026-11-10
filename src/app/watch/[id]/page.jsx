"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdArrowBack } from "react-icons/md";
import { LuListVideo } from "react-icons/lu";
import { useRouter } from "next/navigation";

import { attachVideo } from "../../../lib/video";
import Controls from "../../../components/watch/Controls";

import { saveContinueWatching } from "../../../api/content/saveContinueWatching";
import { getContinueWatching } from "../../../api/content/getVideoContinueWatching";

export default function Video() {
  const router = useRouter();

  // Hls.js video player
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const containerRef = useRef(null);
  const [currentVideoIndex, setcurrentVideoIndex] = useState(0);

  // Player Controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSkipIntro, setShowSkipIntro] = useState(false);
  const [showNextEpisodePreview, setShowNextEpisodePreview] = useState(false);
  const [nextEpisode, setNextEpisode] = useState(null);
  const [nextEpisodeTimer, setNextEpisodeTimer] = useState(45);

  // Episode data
  const [episodeData, setEpisodeData] = useState([]);
  const [showEpisodes, setShowEpisodes] = useState(false);

  // Current video data
  const [currentVideo, setcurrentVideo] = useState({});

  // Get video data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("videoData");

    if (storedData) {
      const data = JSON.parse(storedData);

      setcurrentVideoIndex(data.video_id || "");

      if (data.episodes) {
        setEpisodeData(data.episodes);
      }

      setcurrentVideo(data);
    } else {
      console.error("No video data found in sessionStorage");
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (true) {
        if (currentVideoIndex) {
          let detach = () => {};
          attachVideo(videoRef.current, currentVideoIndex, { autoplay: true }).then((d) => { detach = d; });

          const storedProfile = localStorage.getItem("selectedProfile");
          if (storedProfile) {
            const { profile_id } = JSON.parse(storedProfile);
            const saveInterval = setInterval(() => {
              if (profile_id && currentVideo.contentId) {
                saveContinueWatching(
                  profile_id,
                  currentVideo.contentId,
                  currentVideo.type === "series"
                    ? currentVideo.episode_id
                    : currentVideo.title,
                  parseFloat(videoRef.current.currentTime.toFixed(2))
                ).then((response) => {
                  if (!response.success) {
                    console.error(
                      "Failed to save continue watching:",
                      response.error
                    );
                  }
                });
              } else {
                console.error("Profile ID or content ID missing");
              }
            }, 1000);

            return () => {
              clearInterval(saveInterval);
              detach();
            };
          }
        }
      }
    }
  }, [currentVideoIndex, currentVideo]);

  useEffect(() => {
    const fetchContinueWatchingData = async () => {
      const storedProfile = localStorage.getItem("selectedProfile");
      if (storedProfile) {
        const { profile_id } = JSON.parse(storedProfile);
        if (profile_id && currentVideo.contentId) {
          const response = await getContinueWatching(
            profile_id,
            currentVideo.contentId
          );
          if (response.success && response.data) {
            const { last_watched_duration } = response.data;
            if (videoRef.current) {
              videoRef.current.currentTime = last_watched_duration;
            }
          } else if (!response.success) {
            console.error(
              "Failed to fetch continue watching data:",
              response.error
            );
          }
        }
      }
    };

    fetchContinueWatchingData();
  }, [currentVideoIndex, currentVideo]);

  // Convert time string (HH:MM:SS) to seconds
  const timeStringToSeconds = (timeString) => {
    const [hours = "0", minutes = "0", seconds = "0"] = timeString.split(":");
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10)
    );
  };

  const handleEpisodeClick = (episode) => {
    setcurrentVideoIndex(episode.video_id);
    setcurrentVideo(episode);
    setShowSkipIntro(true);
  };

  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeStringToSeconds(
        currentVideo.intro_marker || "00:00:00"
      );
    }
  };

  const goToNextEpisode = () => {
    if (nextEpisode) {
      handleEpisodeClick(nextEpisode);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume > 0 ? volume : 1;
      } else {
        videoRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        await containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        await containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    }
  };

  const skipForward = () => {
    videoRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    videoRef.current.currentTime -= 15;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <div ref={containerRef} className="w-full h-full relative">
        <div className="absolute top-4 left-0 right-0 flex items-center px-4 z-50 justify-between">
          <button
            type="button"
            className="bg-[#0b0b0c] text-white p-3 text-xl rounded-full transition-opacity duration-300 ease-in-out"
            onClick={() => router.push("/browse")}>
            <MdArrowBack />
          </button>

          {currentVideo.type === "series" && (
            <button
              type="button"
              className="bg-[#0b0b0c] text-white p-3 text-xl rounded-full transition-opacity duration-300 ease-in-out"
              onClick={() => setShowEpisodes(!showEpisodes)}>
              <LuListVideo />
            </button>
          )}
        </div>
        {showEpisodes &&
          currentVideo.type === "series" &&
          episodeData.length > 0 && (
            <div className="absolute top-16 right-4 bg-[#0b0b0c] text-white p-4 rounded-lg z-50">
              <ul className="list-disc pl-5 mt-2 text-sm">
                {episodeData.map((episode) => (
                  <li key={episode.episode_id} className="mb-2">
                    <button
                      onClick={() => handleEpisodeClick(episode)}
                      className="text-blue-400 hover:underline">
                      Season {episode.season_number}, Episode{" "}
                      {episode.episode_number}: {episode.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        {showNextEpisodePreview && nextEpisode && (
          <div className="fixed bottom-20 right-4 bg-[#b6b6b611] backdrop-blur-xl text-white p-4 rounded-lg shadow-lg z-50 flex items-start space-x-4 max-w-md">
            <img
              src={nextEpisode.image_url}
              alt={nextEpisode.title}
              className="w-30 h-28 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-sm font-semibold mb-1">
                {nextEpisode.title}
              </h2>
              <div className="text-xs mb-2">
                Season {nextEpisode.season_number}, Episode{" "}
                {nextEpisode.episode_number}
              </div>
              <p className="text-xs mb-3">{nextEpisode.description}</p>
              <div className="flex justify-end items-center space-x-2">
                <button
                  type="button"
                  className="bg-white text-black px-2 py-1 rounded- hover:bg-gray-300"
                  onClick={goToNextEpisode}>
                  Play Now ({nextEpisodeTimer}s)
                </button>
              </div>
            </div>
          </div>
        )}
        {showSkipIntro && (
          <button
            type="button"
            className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-black py-2 px-4 rounded-lg text-sm font-medium transition-opacity duration-300 ease-in-out"
            onClick={skipIntro}>
            Skip Intro
          </button>
        )}
        <video
          ref={videoRef}
          autoPlay
          poster="/demo/backdrop-1.jpg"
          className="absolute inset-0 h-full w-full bg-black object-cover [@media(orientation:portrait)]:object-contain"
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        <Controls
          isPlaying={isPlaying}
          volume={volume}
          togglePlayPause={togglePlayPause}
          currentTime={currentTime}
          duration={duration}
          isMuted={isMuted}
          toggleMute={toggleMute}
          handleSeekChange={handleSeekChange}
          skipForward={skipForward}
          skipBackward={skipBackward}
          handleFullscreen={handleFullscreen}
          formatTime={formatTime}
          videoRef={videoRef}
          currentVideo={currentVideo}
          isFullscreen={isFullscreen}
        />
      </div>
    </div>
  );
}
