// Watchlist.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Header from "../../../components/content/common/Header";
import StillSearching from "../../../components/my-list/StillSearching";
import CommonSlider from "../../../components/my-list/CommonSlider";
import { getContentWatchlist } from "../../../api/content/getcontentwatchlist";
import LoadingScreen from "../../../components/loading/loadingScreen";

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState({
    movies: [],
    series: [],
  });
  const [filteredWatchlistItems, setFilteredWatchlistItems] = useState({
    movies: [],
    series: [],
  });
  const [profileId, setProfileId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setProfileId(parsedProfile.profile_id);
    }
  }, []);

  useEffect(() => {
    async function fetchWatchlistItems() {
      if (!profileId) return;

      setIsLoading(true);
      setError(null);

      try {
        const { success, data, error } = await getContentWatchlist(profileId);

        if (success) {
          setWatchlistItems(data);
          setFilteredWatchlistItems(data);
        } else {
          throw new Error(error || "Failed to fetch watchlist items");
        }
      } catch (err) {
        console.error("Failed to fetch watchlist items:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWatchlistItems();
  }, [profileId]);

  const handleSearch = useCallback((newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    
    const filteredMovies = watchlistItems.movies.filter(movie =>
      movie.title.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    const filteredSeries = watchlistItems.series.filter(series =>
      series.title.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredWatchlistItems({ movies: filteredMovies, series: filteredSeries });
  }, [watchlistItems]);

  useEffect(() => {
    setFilteredWatchlistItems(watchlistItems);
  }, [watchlistItems]);

  return (
    <div>
      <Header />
      <StillSearching onSearch={handleSearch} searchTerm={searchTerm} />
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {/* {filteredWatchlistItems.movies.length > 0 && (
            <CommonSlider
              sliderImages={filteredWatchlistItems.movies}
              number={3.5}
              text={`Watchlist - Movies (${filteredWatchlistItems.movies.length})`}
              addtionalclass=" w-full md:w-[420px] lg:w-[430px] min-[1440px]:w-[410px] 2xl:w-[430px] min-[1600px]:w-[480px] min-[1800px]:w-[535px] min-[2000px]:w-full "
              addtionalclass2="custum-w-slider2"
            />
          )}
          {filteredWatchlistItems.series.length > 0 && (
            <CommonSlider
              sliderImages={filteredWatchlistItems.series}
              number={3.5}
              text={`Watchlist - Series (${filteredWatchlistItems.series.length})`}
              addtionalclass=" w-full md:w-[420px] lg:w-[430px] min-[1440px]:w-[410px] 2xl:w-[430px] min-[1600px]:w-[480px] min-[1800px]:w-[535px] min-[2000px]:w-full"
              addtionalclass2="custum-w-slider2"
            />
          )} */}

          {filteredWatchlistItems.movies.length > 0 && (
            <CommonSlider
              sliderImages={filteredWatchlistItems.movies}
              //number={3.5}
              number={4.5}
              text={`Watchlist - Movies (${filteredWatchlistItems.movies.length})`}
              addtionalclass="common-slider-w"
              addtionalclass2="custum-w-slider"
            />
          )}
          {filteredWatchlistItems.series.length > 0 && (
            <CommonSlider
              sliderImages={filteredWatchlistItems.series}
              //number={3.5}
              number={4.5}
              text={`Watchlist - Series (${filteredWatchlistItems.series.length})`}
              addtionalclass="common-slider-w"
              addtionalclass2="custum-w-slider"
            />
          )}
          {filteredWatchlistItems.movies.length === 0 &&
            filteredWatchlistItems.series.length === 0 && (
              <div className="text-center px-4 sm:px-16 lg:px-[100px] xl:px-[142px] pt-20 pb-24 md:py-[40px] lg:py-[80px] 2xl:py-[100px]">
                <span className="inline-block font-medium text-white/25 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed 2xl:leading-relaxed max-w-3xl mx-auto">
                  {watchlistItems.movies.length === 0 &&
                  watchlistItems.series.length === 0
                    ? "Your watchlist is empty. Start adding some content!"
                    : "No matching items found in your watchlist."}
                </span>
              </div>
            )}
        </>
      )}
    </div>
  );
}