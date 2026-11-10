import React from "react";
import { NextVideo, PauseIcon, PlayIcon, PreviousVideo } from "./Icons";

const PlaybackControls = ({ isPlaying, togglePlayPause }) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center gap-3">
      <button className="btn-bg p-2.5 w-11 md:w-14 lg:w-16">
        <PreviousVideo />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent video click event
          togglePlayPause();
        }}
        className="btn-bg w-14 md:w-16 lg:w-24 p-4 md:p-5"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className="btn-bg p-2.5 w-11 md:w-14 lg:w-16">
        <NextVideo />
      </button>
    </div>
  );
};

export default PlaybackControls;
