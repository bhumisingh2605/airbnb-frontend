import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search properties..."
      value={value}
      onChange={onChange}
      className="w-full mb-6 p-2 border border-gray-300 rounded"
    />
  );
}

export default SearchBar;