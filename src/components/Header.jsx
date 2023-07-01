import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  const handleClick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  };

  return (
    <div className="bg-[#08D9D6] p-2 px-5 flex justify-between">
      <div className="text-center flex justify-center items-center">
        <h1 className="font-bold text-3xl text-[#EAEAEA] text-center">Let's React</h1>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#252A34] text-[#EAEAEA] p-4 w-64 rounded-lg outline-none"
          value={search}
          onChange={handleChange}
        />
        <button
          className="bg-[#252A34] text-[#EAEAEA] p-4 rounded-lg hover:bg-[#FF2E63]"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button className="p-3 bg-[#252A34] text-white rounded-lg" onClick={handleClick}>Log Out</button>
      </div>
    </div>
  );
};

export default Header;
