import React from 'react';

const Leftside = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    props.setIsAuthenticated(false);
  }

  return (
    <div className="min-h-screen w-1/6 bg-[#191825] px-4 text-center py-3 flex flex-col justify-between">
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
        <form action="">
          <button className="" onClick={handleClick} type='submit'>Log Out</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Leftside;
