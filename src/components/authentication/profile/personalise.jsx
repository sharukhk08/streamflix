// components/authentication/profile/personalise.jsx
"use client";

// library
import React, { useState, useEffect } from "react";
import { BsSearch, BsCheck } from "react-icons/bs";

export default function PersonaliseProfile({ onComplete }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [shuffledImages, setShuffledImages] = useState([]);
  const [initialImagesLoaded, setInitialImagesLoaded] = useState(false);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const storedSelection = localStorage.getItem("selectedImages");
    if (storedSelection) {
      setSelectedImages(new Set(JSON.parse(storedSelection)));
    }
  }, []);

  useEffect(() => {
    if (!initialImagesLoaded) {
      const imageFilenames = [
        "Elephants Dream.jpg",
        "Big Buck Bunny.jpg",
        "Sintel.jpg",
        "Tears of Steel.jpg",
        "Cosmos Laundromat.jpg",
        "Coffee Run.jpg",
        "Sprite Fright.jpg",
        "Charge.jpg",
        "Backstage Stories.jpg",
        "Case File 404.jpg",
        "Laugh Track.jpg",
      ];

      const filteredImages = imageFilenames.filter((filename) =>
        filename.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const selected = Array.from(selectedImages);
      const remainingImages = filteredImages.filter(
        (filename) => !selected.includes(filename)
      );
      const imagesToShow = [
        ...selected,
        ...shuffleArray(remainingImages).slice(0, 6 - selected.length),
      ];

      setShuffledImages(imagesToShow);
      setInitialImagesLoaded(true);
    }
  }, [initialImagesLoaded, searchQuery, selectedImages]);

  const handleImageClick = (filename) => {
    setSelectedImages((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(filename)) {
        updatedSelected.delete(filename);
      } else {
        updatedSelected.add(filename);
      }
      localStorage.setItem(
        "selectedImages",
        JSON.stringify(Array.from(updatedSelected))
      );

      return updatedSelected;
    });
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen px-4 py-4">
      <div className="flex flex-col mt-6 max-w-full w-full sm:w-[600px] lg:w-[805px]">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-white">
          Hey let’s personalise your profile!
        </div>
        <div className="text-xs sm:text-sm lg:text-base font-light text-center text-sky-50 sm:mt-3 lg:mt-4">
          Tailor your movie streaming experience by setting up dedicated
          profiles for each viewer
        </div>
        <div className="mt-8 flex flex-col justify-center px-4 text-base rounded-xl text-zinc-600">
          <div className="flex items-center px-4 py-3 rounded-xl bg-zinc-900">
            <BsSearch className="shrink-0 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Movies, series and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 w-full bg-transparent text-white border-none outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {shuffledImages.slice(0, 6).map((filename, index) => (
            <div key={index} className="relative w-full h-90">
              <img
                src={`/profile/personalise/${filename}`}
                alt={`Personalize Image ${index + 1}`}
                className={`w-full h-full object-cover rounded-2xl transition-transform duration-300 ${
                  selectedImages.has(filename)
                    ? "border-4 border-emerald-400"
                    : ""
                }`}
                onClick={() => handleImageClick(filename)}
              />
              {selectedImages.has(filename) && (
                <div className="absolute bottom-2 right-2 p-1 rounded-full bg-emerald-400">
                  <BsCheck className="text-white text-xl" />
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onComplete}
          className="self-center px-8 py-4 mt-6 text-center text-base font-bold text-black whitespace-nowrap bg-[#00FF99] rounded-xl w-1/2">
          Next
        </button>
      </div>
    </div>
  );
}
