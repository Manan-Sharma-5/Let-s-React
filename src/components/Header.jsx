import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="bg-[#08D9D6] p-2 px-5 flex justify-between ">
      <div className="text-center flex justify-center items-center">
        <h1 className="font-bold text-3xl text-[#EAEAEA] text-center">Let's React</h1>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#252A34] text-[#EAEAEA] p-4 w-64 rounded-lg outline-none"
        />
        <button className="bg-[#252A34] text-[#EAEAEA] p-4 rounded-lg hover:bg-[#FF2E63]">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default Header;
