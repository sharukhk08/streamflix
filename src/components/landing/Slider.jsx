import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeButton, setActiveButton] = useState("Popular");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Updated state with correct seasons/minutes, release years, and maturity ratings
  const [showInfo] = useState([
    {
      title: "Cosmos Laundromat",
      duration: "12 minutes",
      year: 2015,
      maturity: "PG",
      image: "landingpage-5.jpg",
      type: "movie",
      rating: 7.8,
    },
    {
      title: "Elephants Dream",
      duration: "11 minutes",
      year: 2006,
      maturity: "PG",
      image: "landingpage-1.jpg",
      type: "movie",
      rating: 8.5,
    },
    {
      title: "Big Buck Bunny",
      duration: "10 minutes",
      year: 2008,
      maturity: "PG",
      image: "landingpage-2.jpg",
      type: "movie",
      rating: 7.2,
    },
    {
      title: "Sintel",
      duration: "15 minutes",
      year: 2010,
      maturity: "PG",
      image: "landingpage-3.jpg",
      type: "movie",
      rating: 8.9,
    },
    {
      title: "Tears of Steel",
      seasons: 1,
      year: 2012,
      maturity: "PG",
      image: "landingpage-4.jpg",
      type: "series",
      rating: 8.1,
    },
    {
      title: "Coffee Run",
      duration: "3 minutes",
      year: 2020,
      maturity: "PG",
      image: "landingpage-6.jpg",
      type: "movie",
      rating: 6.9,
    },
    {
      title: "Sprite Fright",
      seasons: 2,
      year: 2021,
      maturity: "PG",
      image: "landingpage-7.jpg",
      type: "series",
      rating: 8.7,
    },
    {
      title: "Charge",
      duration: "4 minutes",
      year: 2022,
      maturity: "PG",
      image: "landingpage-8.jpg",
      type: "movie",
      rating: 7.5,
    },
    {
      title: "Elephants Dream",
      duration: "11 minutes",
      year: 2006,
      maturity: "PG",
      image: "landingpage-9.jpg",
      type: "movie",
      rating: 7.0,
    },
    {
      title: "Big Buck Bunny",
      duration: "10 minutes",
      year: 2008,
      maturity: "PG",
      image: "landingpage-10.jpg",
      type: "movie",
      rating: 6.5,
    },
  ]);
  const totalItems = showInfo.length;

  const handleItemClick = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-end px-4 w-full">
      <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-8">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-4 sm:mb-8">
          Discover Unlimited Content
        </h2>
        <div className="flex justify-center mb-4 sm:mb-8 overflow-x-auto">
          <div className="inline-flex bg-white rounded-xl overflow-hidden border-2 border-[#111111] flex-wrap justify-center">
            {["Popular", "Latest", "Top Rated"].map(
              (buttonName, index) => (
                <button
                  key={buttonName}
                  className={`px-3 sm:px-6 py-2 sm:py-3 m-1 text-xs sm:text-sm md:text-base font-medium transition-colors ${
                    activeButton === buttonName
                      ? "bg-[#00FF99] text-black rounded-xl"
                      : "text-black hover:bg-[#00FF99] hover:text-black rounded-xl"
                  } ${index === 0 ? "rounded-xl" : ""} ${
                    index === 3 ? "rounded-xl" : ""
                  }`}
                  onClick={() => handleButtonClick(buttonName)}>
                  {buttonName}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[550px] xl:h-[550px] relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end">
          {showInfo.map((show, i) => (
            <div
              key={i}
              className={`w-full max-w-[140px] sm:max-w-[200px] md:max-w-[280px] aspect-[2/3] rounded-lg absolute cursor-pointer transition-all duration-500 ease-in-out ${
                i === activeIndex ? "cursor-default" : "hover:opacity-90"
              }`}
              style={{
                transform: `rotate(${
                  (i - activeIndex) * (360 / totalItems)
                }deg) translateY(-20%) ${
                  i === activeIndex ? "scale(1.1)" : "scale(0.9)"
                }`,
                transformOrigin: "center bottom",
                zIndex:
                  i === activeIndex
                    ? totalItems
                    : totalItems - Math.abs(i - activeIndex),
                opacity: isTransitioning ? 0.5 : 1,
              }}
              onClick={() => handleItemClick(i)}>
              <Image
                src={`/images/${show.image}`}
                alt={show.title}
                fill
                className={`object-cover rounded-2xl transition-all duration-500 ${
                  i !== activeIndex ? "grayscale" : ""
                }`}
              />
              <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-white/10 rounded-full px-1 sm:px-2 py-0.5 sm:py-1 capitalize text-[10px] sm:text-xs font-medium">
                {show.type}
              </div>
              {i === activeIndex && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-2 sm:p-4">
                    <h2 className="text-white text-sm sm:text-xl font-bold text-center mb-1 sm:mb-2">
                      {show.title}
                    </h2>
                    <p className="flex gap-1 sm:gap-2 text-[#5F5F5F] font-bold text-[8px] sm:text-xs">
                      <span>{show.year}</span>
                      <span>•</span>
                      <span>
                        {show.seasons
                          ? `${show.seasons} Season${
                              show.seasons > 1 ? "s" : ""
                            }`
                          : show.duration
                          ? show.duration
                          : ""}
                      </span>
                      <span>•</span>
                      <span>{show.maturity}</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
