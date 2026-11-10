import React from "react";

const PageHeading = ({ type, category }) => {
  return (
    <div className="flex items-center py-4 px-6">
      <h1 className="text-2xl font-bold text-white mr-4 capitalize">
        {type}
        {category && (
          <>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-400">{category}</span>
          </>
        )}
      </h1>
    </div>
  );
};

export default PageHeading;
