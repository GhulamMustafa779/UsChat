import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ type, name, value, placeholder, changeHandle }) => {
  return (
    <div className="border border-gray-200 rounded-md w-100 overflow-hidden bg-white flex items-center px-2 shadow-sm">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandle}
        className="w-full p-2 outline-none text-sm font-regular"
      />
      {!value && <IoSearch className="text-gray-500 text-2xl" />}
    </div>
  );
};

export default SearchBar;
