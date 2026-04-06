import React from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 rounded-xl mb-3"></div>
      <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
    </div>
  );
}

export default SkeletonCard;