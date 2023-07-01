import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Leftside from "../components/Leftside";
import Rightside from "../components/Rightside";

function Dashboard({ setIsAuthenticated }) {
  const [rightValue, setRightValue] = useState(0);
  const [cardsData, setCardsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (search) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk5ZDEwN2ZmZGZmZDg5ODA2MjUyOGJmN2RiYjFhOSIsInN1YiI6IjY0OTZjZWY2NjJmMzM1MDBhZDAwNGRmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JbmM-GMotf0O4Q7zy7HNO8vBLT4oXkjkR8MxfekMSnk'
      }
    };

    fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setCardsData(data.results);
        setRightValue(4);
      })
      .catch(err => console.error(err));
  };

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

    if (rightValue === 2) {
      setCardsData([]);
      fetch("http://localhost:8000/data/movie/new")
        .then((res) => res.json())
        .then((data) => {
          setCardsData(data.results);
        })
        .catch((err) => console.log(err));
    }

    if (rightValue === 3) {
      setCardsData([]);
      fetch("http://localhost:8000/data/tv/new")
        .then((res) => res.json())
        .then((data) => {
          setCardsData(data.results);
        })
        .catch((err) => console.log(err));
    }

    if (rightValue === 4) {
      setCardsData([]);
      const searchRes = searchResults.results.slice(0, 3);
      setCardsData(searchRes);
    }
  }, [rightValue, searchResults]);

  return (
    <div className="bg-[#252A34] min-h-screen">
      <Header onSearch={handleSearch} />
      <div className="flex">
        <Leftside
          setIsAuthenticated={setIsAuthenticated}
          setRightValue={setRightValue}
        />
        <Rightside cardsData={cardsData} />
      </div>
    </div>
  );
}

export default Dashboard;
