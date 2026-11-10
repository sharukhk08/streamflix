import React from "react";
import { SearchIcon2 } from "../content/common/Icons";

const StillSearching = ({ onSearch, searchTerm }) => {
  return (
    <>
      <div className="text-center px-4 sm:px-16 lg:px-[100px] xl:px-[142px] pt-20 pb-24 md:py-[40px] lg:py-[80px] 2xl:py-[100px]">
        <div className="block">
          <h2 className="font-normal text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] xl:leading-[60px] max-w-[1037px] mx-auto">
            <span className="font-bold text-[#00FF99]">Search</span> your watchlist
          </h2>
          <h2 className="font-normal text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] xl:leading-[60px] max-w-[1037px] mx-auto">
            Find the perfect
            <span className="font-bold text-[#00FF99]">
              {" "}movie or series
            </span>
          </h2>
        </div>
        <form
          className="flex items-center justify-between mt-7 sm:mt-15 lg:mt-16 2xl:mt-[75px] py-3 px-5 md:px-6 xl:py-[27px] xl:px-[35px] rounded-full bg-[#181818]"
          onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="What's on your mind? Type a word, thought, or feeling, and we'll match you with something perfect!"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-transparent text-white focus:outline-none placeholder:text-white/25 text-base sm:text-lg md:text-xl 2xl:text-2xl 
            placeholder:text-base placeholder:sm:text-lg placeholder:md:text-xl placeholder:2xl:text-2xl pr-3"
          />
          <button type="submit" className="cursor-pointer">
            <SearchIcon2 />
          </button>
        </form>
      </div>
    </>
  );
};

export default StillSearching;
