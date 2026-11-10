import React, { useState } from "react";
import { SearchIcon2 } from "./common/Icons";
import { useRouter } from "next/navigation";

const StillSearching = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      <div className="text-center px-4 sm:px-16 lg:px-[100px] xl:px-[142px] pt-20 pb-24 md:py-[140px] lg:py-[180px] 2xl:py-[200px]">
        <div className="">
          <h2 className="font-normal text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] leading-[34px] px-1 md:leading-[55px] max-w-[1037px] mx-auto md:hidden">
            <span className="font-bold text-[#00FF99]">Still searching</span>{" "}
            for something to watch? Don’t let your food get cold—
            <span className="font-bold text-[#00FF99]">
              find your next movie now!
            </span>
          </h2>
          <div className="hidden md:block">
            <h2 className="font-normal text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] xl:leading-[60px] max-w-[1037px] mx-auto">
              <span className="font-bold text-[#00FF99]">Still searching</span>{" "}
              for something to watch?
            </h2>
            <h2 className="font-normal text-white text-2xl md:text-3xl lg:text-4xl 2xl:text-[40px] xl:leading-[60px] max-w-[1037px] mx-auto">
              Don’t let your food get cold—
              <span className="font-bold text-[#00FF99]">
                find your next movie now!
              </span>
            </h2>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-between mt-7 sm:mt-15 lg:mt-16 2xl:mt-[75px] py-3 px-5 md:px-6 xl:py-[27px] xl:px-[35px] rounded-full bg-[#181818]">
            <input
              type="text"
              placeholder="What's on your mind? Type a word, thought, or feeling, and we'll match you with something perfect!"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none placeholder:text-white/25 text-base sm:text-lg md:text-xl 2xl:text-2xl 
              placeholder:text-base placeholder:sm:text-lg placeholder:md:text-xl placeholder:2xl:text-2xl pr-3"
            />
            <button type="submit" className="cursor-pointer">
              <SearchIcon2 />
            </button>
          </form>
          <p className="pt-4 md:pt-5 xl:pt-6 font-normal text-white text-lg md:text-xl 2xl:text-2xl">
            We have{" "}
            <span className="font-semibold text-[#00FF99]">Dozens of</span> movies
            & series that you can watch now!
          </p>
        </div>
      </div>
    </>
  );
};

export default StillSearching;
