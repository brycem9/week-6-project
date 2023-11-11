import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Landing() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  function handleSearch() {
    fetchMovies(keyword);
    setLoading(true);
  }

  async function fetchMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=867f9b9b&s=${keyword}`
    );
    setMovies(data.Search);
    console.log(data);
    navigate("/home", { state: { movies: data.Search } });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="row">
      <Navbar />
      <div className="flex mt-1 justify-center">
        <video
          className="absolute"
          muted
          loop
          autoPlay
          src="\assets\movietrailers.mp4"
        ></video>
      </div>
      <div className="flex justify-center mt-24 text-white"></div>
      <div className="flex flex-col items-center justify-center pt-8">
        <div className="input__wrap bg-[#00000000] relative flex justify-center items-center w-full max-w-[900px]">
          <input
            onChange={(event) => setKeyword(event.target.value)}
            value={keyword}
            onKeyPress={(event) => event.key === "Enter" && handleSearch()}
            className="bg-white w-[75%] outline-none rounded-full p-3"
            placeholder="Dive into cinematic bliss"
            type="text"
          />
          {loading ? (
            <div className="absolute spinner top-0 bottom-0 right-0 mr-32 bg-[#00000000] flex justify-center items-center">
              <img
                src="/assets/3095076-200.png"
                className="w-8 bg-white text-[#D334AB]"
              />
            </div>
          ) : (
            <div
              onClick={() => handleSearch()}
              className="absolute icon__wrapper top-0 bottom-0 right-0 mr-[15%] bg-[#00000000] flex justify-center items-center"
            >
              <MagnifyingGlassIcon
                onClick={() => handleSearch()}
                className="w-8 bg-white text-[#D334AB]"
              />
            </div>
          )}
        </div>
        <figure className="landing__img--wrapper mt-24">
          <img
            className="w-80 h-80"
            src="\assets\undraw_home_cinema_l7yl.svg"
            alt=""
          />
        </figure>
      </div>
    </div>
  );
}

export default Landing;
