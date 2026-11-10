// Search.jsx

"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CommonSlider from "../../components/search/CommonSlider";
import Header from "../../components/content/common/Header";
import { SearchIcon2 } from "../../components/content/common/Icons";
import { getContent } from "../../api/content/getcontent";
import Loading from "../../components/loading/loadingScreen";

const SearchPageContent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [relatedCollections, setRelatedCollections] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [redirectTimer, setRedirectTimer] = useState(null);

  // Keep the search box and results in sync when the URL changes (e.g. a search from the header).
  const urlQuery = searchParams.get("q") || "";
  useEffect(() => {
    setSearchTerm(urlQuery);
  }, [urlQuery]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        router.push(
          `/search?q=${encodeURIComponent(searchTerm.trim())}`,
          undefined,
          {
            shallow: true,
          }
        );
      }
    },
    [searchTerm, router]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);

      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }

      if (!newSearchTerm.trim()) {
        const timer = setTimeout(() => {
          router.push("/browse");
        }, 30000);
        setRedirectTimer(timer);
      }
    },
    [router, redirectTimer]
  );

  const handleItemClick = (term) => {
    setSearchTerm(term);
    router.push(`/search?q=${encodeURIComponent(term)}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        const data = await getContent();
        const flattenedContent = data.collections.flatMap((collection) =>
          collection.items.map((item) => ({
            ...item,
            collectionName: collection.name,
            categories: Array.isArray(item.type) ? item.type : [item.type],
          }))
        );
        setAllContent(flattenedContent);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchAllContent();
  }, []);

  useEffect(() => {
    const filterContent = () => {
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filteredResults = allContent.filter(
          (item) =>
            item.title.toLowerCase().includes(lowerSearchTerm) ||
            item.collectionName.toLowerCase().includes(lowerSearchTerm) ||
            item.categories.some((category) =>
              category.toLowerCase().includes(lowerSearchTerm)
            ) ||
            item.content.toLowerCase().includes(lowerSearchTerm)
        );
        const seenIds = new Set();
        setSearchResults(
          filteredResults.filter((it) => !seenIds.has(it.id) && seenIds.add(it.id))
        );

        // Get related collections
        const collections = [
          ...new Set(filteredResults.map((item) => item.collectionName)),
        ];
        setRelatedCollections(collections);

        // Get related categories
        const categories = [
          ...new Set(filteredResults.flatMap((item) => item.categories)),
        ];
        setRelatedCategories(categories);
      } else {
        setSearchResults([]);
        setRelatedCollections([]);
        setRelatedCategories([]);
      }
    };

    filterContent();

    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [searchTerm, allContent, redirectTimer]);

  const MAX_EXPLORE_ITEMS = 4; // Set the limit here

  return (
    <div>
      <Header />
      <main className="px-4 sm:px-16 lg:px-24 xl:px-36">
        <div className="mb-8 text-center md:py-8 lg:py-12 2xl:py-16">
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-between mt-7 sm:mt-15 lg:mt-16 2xl:mt-[75px] py-3 px-5 md:px-6 xl:py-[27px] xl:px-[35px] rounded-full bg-[#181818]">
            <input
              type="text"
              placeholder="What's on your mind? Type a word, thought, or feeling, and we'll match you with something perfect!"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-transparent text-white focus:outline-none placeholder:text-white/25 text-base sm:text-lg md:text-xl 2xl:text-2xl 
              placeholder:text-base placeholder:sm:text-lg placeholder:md:text-xl placeholder:2xl:text-2xl pr-3"
            />
            <button type="submit" className="cursor-pointer">
              <SearchIcon2 />
            </button>
          </form>
          {(searchResults.length > 0 ||
            relatedCollections.length > 0 ||
            relatedCategories.length > 0) && (
            <div className="py-8">
              <p className="font-semibold text-[#00FF99] text-sm sm:text-base md:text-lg 2xl:text-xl mb-4">
                More to explore:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {searchResults.slice(0, MAX_EXPLORE_ITEMS).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.title)}
                    className="bg-[#181818] rounded-full px-4 py-2 text-white text-sm md:text-base 2xl:text-lg hover:bg-[#2a2a2a] hover:text-[#00FF99] transition-colors">
                    {item.title}
                  </button>
                ))}
                {relatedCollections
                  .slice(0, MAX_EXPLORE_ITEMS)
                  .map((collection) => (
                    <button
                      key={collection}
                      onClick={() => handleItemClick(collection)}
                      className="bg-[#181818] rounded-full px-4 py-2 text-white text-sm md:text-base 2xl:text-lg hover:bg-[#2a2a2a] hover:text-[#00FF99] transition-colors">
                      {collection}
                    </button>
                  ))}
                {relatedCategories
                  .slice(0, MAX_EXPLORE_ITEMS)
                  .map((category) => (
                    <button
                      key={category}
                      onClick={() => handleItemClick(category)}
                      className="bg-[#181818] rounded-full px-4 py-2 text-white text-sm md:text-base 2xl:text-lg hover:bg-[#2a2a2a] hover:text-[#00FF99] transition-colors">
                      {category}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {searchTerm ? (
        searchResults.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold px-4 sm:px-16 lg:px-24 xl:px-36">
              Search Results for "
              <span className="text-[#00FF99]">{searchTerm}</span>"
            </h2>
            <CommonSlider
              number={4.5}
              sliderImages={searchResults}
              addtionalclass="common-slider-w"
              addtionalclass2="custum-w-slider"
              isSearchResults={true}
            />
          </div>
        ) : (
          <div className="text-center px-4 sm:px-16 lg:px-24 xl:px-36 mb-8">
            <h2 className="text-2xl font-bold mb-8">
              Your search for "
              <span className="text-[#00FF99]">{searchTerm}</span>" did not have
              any matches.
            </h2>
            <h3 className="text-xl font-semibold mb-4 text-[#00FF99]">
              Suggestions:
            </h3>
            <ul className="list-none text-center text-sm max-w-md mx-auto">
              <li className="mb-4">Try different keywords</li>
              <li className="mb-4">
                Looking for a film or TV programme? Try using a film, TV
                programme title, an actor or director.
              </li>
              <li className="mb-4">
                Try a genre, such as comedy, romance, sports or drama.
              </li>
              <li className="mb-4">
                Try a mood, such as happy, sad, romantic or dramatic.
              </li>
            </ul>
          </div>
        )
      ) : null}
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
