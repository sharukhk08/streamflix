import React from "react";

const VideoTitleAndTime = ({
  currentTime,
  duration,
  formatTime,
  currentVideo,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h5 className="text-sm sm:text-base font-helvetica xl:text-xl leading-[100%] text-white">
        {currentVideo.title || ""}
        {currentVideo.type === "series" && currentVideo.title && (
          <span className="text-sm sm:text-base font-helvetica xl:text-xl leading-[100%] text-[#B3B3B3]">
            {`Season ${currentVideo.season_number}, Episode ${currentVideo.episode_number}`}
          </span>
        )}
      </h5>
      <h6 className="text-white text-xs sm:text-sm xl:text-base font-laato font-light leading-[100%]">
        {formatTime(currentTime)} / {formatTime(duration)}
      </h6>
    </div>
  );
};

export default VideoTitleAndTime;
