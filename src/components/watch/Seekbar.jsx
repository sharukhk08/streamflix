import React, { useState } from "react";

const Seekbar = ({ currentTime, duration, handleSeekChange, formatTime }) => {
  const [hoverPosition, setHoverPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    setHoverPosition(position);
  };
  return (
    <div className="relative z-10 group w-full !min-h-[4px] rounded-full flex justify-center items-center my-2.5 xl:my-4">
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime || 0}
        onChange={(e) => handleSeekChange(e)}
        className="w-full absolute top-0 h-full opacity-0 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      <div className="absolute left-0 w-full h-full bg-[#D9D9D9] rounded-full opacity-40"></div>

      <div
        className="absolute left-0 h-full bg-white rounded-full"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      ></div>

      <div
        className="absolute w-3 h-3 cursor-pointer bg-white rounded-full -translate-x-1/2"
        style={{ left: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
      ></div>

      {isHovering && (
        <div
          className="absolute -top-24 w-[160px] h-20 border border-white shadow-custom rounded-lg bg-black overflow-hidden"
          style={{
            left: `${hoverPosition}%`,
            transform: "translateX(-50%)",
          }}
        >
          <img
            src="/demo/backdrop-1.jpg"
            alt="Thumbnail Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className="absolute -top-8 xl:-top-10 max-h-[30px] flex justify-center items-center py-1 px-2 xl:px-3 xl:py-2 border-white border bg-primary shadow-custom rounded-lg text-blackSheep text-xs xl:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none"
        style={{
          left: `${(currentTime / duration) * 100}%`,
          transform: "translateX(-50%)",
        }}
      >
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default Seekbar;
