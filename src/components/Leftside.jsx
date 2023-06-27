import React from 'react';

const Leftside = (props) => {
  return (
    <div className="min-h-screen w-1/6 bg-[#191825] px-3 py-3 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <div
          className="border-2 p-3 text-white flex items-center justify-center hover:bg-[#FF2E63] duration-200 transition-all cursor-pointer"
          onClick={() => props.tptp(0)}
        >
          <div className="">Trending</div>
        </div>
        <div
          className="border-2 p-3 text-white flex items-center justify-center hover:bg-[#FF2E63] duration-200 transition-all cursor-pointer"
          onClick={() => props.tptp(1)}
        >
          <div className="">New Release</div>
        </div>
        <div className="border-2 p-3 text-white flex items-center justify-center hover:bg-[#FF2E63] duration-200 transition-all cursor-pointer">
          <div className="">Movies</div>
        </div>
        <div className="border-2 p-3 text-white flex items-center justify-center hover:bg-[#FF2E63] duration-200 transition-all cursor-pointer">
          <div className="">TV Shows</div>
        </div>
      </div>
      <div className="">
        <div className="border-2 p-3 text-white flex items-center justify-center hover:bg-[#FF2E63] duration-200 transition-all cursor-pointer">
          <div className="">Log Out</div>
        </div>
      </div>
    </div>
  );
};

export default Leftside;
