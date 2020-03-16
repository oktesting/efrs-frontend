import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      name="query"
      placeholder="Search..."
      onChange={e => onChange(e.currentTarget.value)}
      className="form-control my-3"
    />
  );
};

export default SearchBox;
