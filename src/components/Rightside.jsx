import React from 'react';

const Rightside = (props) => {
  const { cardsData } = props;

  const handleClick = (id, title) => {
    console.log(title);
    openChatWindow(`/react/`, id, title);
  };
  
  const openChatWindow = (url, id, title) => {
    const popupUrl = `${url}?title=${encodeURIComponent(title)}&id=${encodeURIComponent(id)}`;
    const popup = window.open(popupUrl, 'ChatWindow', 'width=600,height=400');
    popup.document.title = title;
  };

  return (
    <div className="pt-3 px-5 text-white flex-grow">
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
            onClick={(e) => handleClick(card.id, card.title || card.name)}
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
