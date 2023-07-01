import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Leftside from "../components/Leftside";
import Rightside from "../components/Rightside";

function Dashboard({ setIsAuthenticated }) {
  const [rightValue, setRightValue] = useState(0);
  const [cardsData, setCardsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {

    if (rightValue === undefined || rightValue === 0) {
      setCardsData([]);
      fetch("http://localhost:8000/data")
        .then((res) => res.json())
        .then((data) => {
          setCardsData(data.results);
        })
        .catch((err) => console.error("error:", err));
    }

    if (rightValue === 1) {
      setCardsData([]);
      fetch("http://localhost:8000/data/new")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data.results);
      })
      .catch((err) => console.log(err));
    }

    if (rightValue === 2){
      setCardsData([]);
      fetch("http://localhost:8000/data/movie/new")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data.results);
      })
      .catch((err) => console.log(err));
    }

    if (rightValue === 3){
      setCardsData([]);
      fetch("http://localhost:8000/data/tv/new")
      .then((res) => res.json())
      .then((data) => {
        setCardsData(data.results);
      })
      .catch((err) => console.log(err));
    }

    if (rightValue === 4){
      setCardsData([]);
      const searchRes = (searchResults.results).slice(0, 3)
      setCardsData(searchRes);
    }

    if(searchResults.results !==undefined && (searchResults.results).length > 0){
      setRightValue(4);
    }


  }, [rightValue, rightValue === undefined || rightValue === 0, searchResults]);



  return (
    <div className="bg-[#252A34] min-h-screen">
      <Header setSearchResults = {(e) => setSearchResults(e)}/>
      <div className="flex">
        <Leftside
          setIsAuthenticated={setIsAuthenticated}
          setRightValue={(e) => setRightValue(e)}
        />
        <Rightside cardsData={cardsData} />
      </div>
    </div>
  );
}

export default Dashboard;
