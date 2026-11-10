// browse.jsx
"use client";

// library imports
import LazyMount from "../../components/common/LazyMount";
import React, { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getContent } from "../../api/content/getcontent";
import { getContinueWatching } from "../../api/content/getContinueWatching";

// components
import Header from "../../components/content/common/Header";
import CommonSlider from "../../components/content/CommonSlider";
import Hero from "../../components/content/Hero";
import StillSearching from "../../components/content/StillSearching";
// import TrendingStar from "../../components/content/TrendingStar";

export default function Browse() {
  const [collections, setCollections] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  // const [trendingStars, setTrendingStars] = useState([]);
  const isDataFetched = useRef(false);

  useEffect(() => {
    if (!isDataFetched.current) {
      fetchContentData();
      fetchContinueWatchingData();
      isDataFetched.current = true;
    }
  }, []);

  const fetchContentData = async () => {
    try {
      const data = await getContent();
      setCollections(data.collections);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const fetchContinueWatchingData = async () => {
    try {
      const storedProfile = localStorage.getItem("selectedProfile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        const data = await getContinueWatching(parsedProfile.profile_id);
        setContinueWatching(data);
      }
    } catch (error) {
      console.error("Error fetching continue watching data:", error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <Hero />
        <CommonSlider
          sliderImages={continueWatching}
          number={4.5}
          text="Continue Watching"
          addtionalclass="common-slider-w"
          addtionalclass2="custum-w-slider"
        />
        {collections.map((collection, index) => {
          const row = (
            <>
              <CommonSlider
                sliderImages={collection.items}
                number={4.5}
                text={collection.name}
                addtionalclass="common-slider-w"
                addtionalclass2="custum-w-slider"
              />
              {index === 2 && <StillSearching />}
            </>
          );
          return (
            <React.Fragment key={index}>
              {index === 0 ? row : <LazyMount minHeight={340}>{row}</LazyMount>}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
