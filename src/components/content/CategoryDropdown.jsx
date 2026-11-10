import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CategoryDropdown = ({
  categories,
  selectedCategory,
  onCategoryChange,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
    if (category !== selectedCategory) {
      router.push(`/browse/genres/${type}/${category}`);
    }
  };

  return (
    <div className="relative py-4 px-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 px-4 py-2 text-white bg-transparent border border-white/20 rounded-full focus:outline-none capitalize">
        <span>{selectedCategory || "Categories"}</span>
        <FaChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-48 mt-1 bg-[#252525] rounded-2xl shadow-lg overflow-hidden">
          <ul className="py-1">
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer capitalize"
                onClick={() => handleCategorySelect(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
