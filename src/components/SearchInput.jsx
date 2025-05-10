import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Enter the movies"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
