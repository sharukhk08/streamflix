import React, { useState } from "react";
import {
  FullScreen,
  MdForward,
  MdRewind,
  Message,
  Mute,
  NextVideo,
  OtherOptions,
  PauseIcon,
  PlayIcon,
  PreviousVideo,
  SmallScreen,
  UnmuteIcon,
} from "./Icons";
import PlaybackControls from "./PlaybackControls";
import VideoTitleAndTime from "./VideoTitleAndTime";
import Seekbar from "./Seekbar";

const Controls = ({
  isPlaying,
  togglePlayPause,
  currentTime,
  duration,
  isMuted,
  toggleMute,
  handleSeekChange,
  skipForward,
  skipBackward,
  handleFullscreen,
  formatTime,
  currentVideo,
}) => {
  const [showControls, setShowControls] = useState(false);

  const handleVideoClick = () => {
    setShowControls(!showControls);
    togglePlayPause();

    // Toggle controls visibility
  };

  return (
    <>
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleVideoClick}>
        {/* Center Play Controls - Only show when showControls is true */}
        {showControls && (
          <PlaybackControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
        )}
      </div>
      <div className="absolute right-4 top-2 flex gap-2 items-center xl:hidden">
        <button className="btn-bg p-1.5 md:p-2.5 w-8 md:w-10 lg:w-12">
          <SmallScreen />
        </button>
        <button className="btn-bg p-1.5 md:p-2.5 w-8 md:w-10 lg:w-12">
          <Message />
        </button>
        <button className="btn-bg p-1.5 md:py-2.5 w-8 h-8 md:h-10 lg:h-12 md:w-10 lg:w-12">
          <OtherOptions />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 lg:px-8 2xl:px-10 sm:py-2.5 xl:p-4">
        <div className="w-full">
          <VideoTitleAndTime
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            currentVideo={currentVideo}
          />

          <Seekbar
            currentTime={currentTime}
            duration={duration}
            handleSeekChange={handleSeekChange}
            formatTime={formatTime}
          />
        </div>

        <div className="hidden xl:flex justify-between items-center">
          <div className="flex items-center gap-4 h-[25px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="w-6 flex justify-center items-center">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                skipBackward();
              }}>
              <MdRewind />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                skipForward();
              }}>
              <MdForward />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}>
              {isMuted ? <Mute /> : <UnmuteIcon />}
            </button>
            <button className="w-6 h-6">
              <Message />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}>
              <FullScreen />
            </button>
            <button className="w-5 h-5">
              <OtherOptions />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
