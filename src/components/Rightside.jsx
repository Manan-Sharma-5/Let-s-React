import React, { useEffect, useState } from 'react';

const Rightside = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/data')
      .then(res => res.json())
      .then(data => {
        setCardsData(data.results);
        console.log(data);
      })
      .catch(err => console.error('error:', err));
  }, []);

  return (
    <div className="pt-3 text-white flex-grow">
      <div className="grid grid-cols-3 gap-5">
        {cardsData.map(card => (
          <div
            key={card.id}
            className="border-2 bg-white hover:cursor-pointer 
              shadow-lg shadow-[#08D9D6] group container rounded-md 
              flex justify-center text-center items-center mx-auto content-div p-8"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${card.backdrop_path})`
            }}
          >
            <div className="opacity-0 group-hover:opacity-100">
              <span className="text-2xl font-bold text-black tracking-wider">
                {card.title || card.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rightside;
