import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const location = useLocation();
  const initialMovies = location.state?.movies || [];
  const [movies, setMovies] = useState(initialMovies);
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  function handleSearch() {
    fetchMovies(keyword);
  }

  async function fetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=867f9b9b&s=${keyword}`
    );
    setMovies(data.Search);
    console.log(data);
  }

  useEffect(() => {
    setMovies(location.state?.movies || []);
  }, [location.state]);

  const filterMovies = (event) => {
    const filter = event.target.value;
    let sortedMovies = [...movies];

    if (filter === "OLD_TO_NEW") {
      sortedMovies.sort((a, b) => new Date(a.Year) - new Date(b.Year));
    } else if (filter === "NEW_TO_OLD") {
      sortedMovies.sort((a, b) => new Date(b.Year) - new Date(a.Year));
    }

    setMovies(sortedMovies);
  };

  return (
    <div className="row">
      <Navbar />
      <div className="flex justify-center mt-24 text-white">
        <h1 className="text-5xl main__header tracking-wider">Browse your favorite titles</h1>
      </div>
      <div className="flex justify-center pt-8">
        <div className="input__wrap relative flex justify-center items-center w-full max-w-[900px]">
          <input
            onChange={(event) => setKeyword(event.target.value)}
            value={keyword}
            onKeyPress={(event) => event.key === "Enter" && handleSearch()}
            className="bg-white w-[75%] outline-none rounded-full p-3"
            placeholder="Dive into cinematic bliss"
            type="text"
          />
          <div
            onClick={() => handleSearch()}
            className="absolute top-0 bottom-0 right-0 mr-[15%] bg-[#00000000] flex justify-center items-center"
          >
            <MagnifyingGlassIcon className="w-8 bg-white text-[#D334AB]" />
          </div>
        </div>
      </div>
      <div className="text-white flex justify-center pt-20">
        <h1 className="text-2xl">Results </h1>
      </div>

      <div className="pt-20 text-white">
        <div className="filter__wrapper flex justify-end p-4">
          <select  onChange={filterMovies} className="outline-none rounded-full  text-[#D334AB] bg-white border w-48 p-0.5">
            <option className="filter__option" selected >
              Sort
            </option>
            <option className="filter__option" value="NEW_TO_OLD">
              Year, newest to oldest
            </option>
            <option className="filter__option" value="OLD_TO_NEW">
              Year, oldest to newest
            </option>
          </select>
        </div>
        <div className="movies__container flex flex-wrap p-8">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/${movie.imdbID}`)}
              className="movie__card flex w-[25%] flex-col items-center justify-center p-8 "
            >
              <div className="poster__img--wrapper">
                <img
                  className="rounded cursor-pointer object-cover w-full h-full"
                  src={movie.Poster}
                  alt=""
                />
              </div>
              <div className="flex flex-col items-center">
                <h1>{movie.Title}</h1>
                <p>({movie.Year})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
