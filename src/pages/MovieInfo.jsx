import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

function MovieInfo() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  console.log(id);
  const [movieDetail, setmovieDetail] = useState("");
  let navigate = useNavigate();

  async function fetchMovieInformation() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apikey=867f9b9b&s=`
    );
    console.log(data);
    setmovieDetail(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieInformation();
  }, []);

  return (
    <div className="text-white row">
      <Navbar />

      <div className="w-full flex items-center mt-12">
        <a href="/home">
          <ArrowLeftCircleIcon className="w-12 text-[#D334AB]" />
        </a>

        {loading ? (
          <>
            <figure className="w-[50%] flex flex-col items-center  justify-center">
              <div className=" w-[300px] h-[400px] rounded bg-slate-600"></div>
              <div className="flex flex-col items-center">
                <p className="mt-4 bg-slate-600 w-32 h-4 "></p>
                <p className="mt-4 bg-slate-600 w-32 h-4"></p>
              </div>
            </figure>
            <div className="w-[50%] flex flex-col items-center">
              <h1 className="mb-24 text-4xl bg-slate-600 w-[500px] h-8"></h1>
              <h2 className="mb-16 text-2xl bg-slate-600 w-[300px] h-8"></h2>
              <p className="bg-slate-600 w-[350px] mb-3 h-6"></p>
              <p className="bg-slate-600 w-[350px] mb-3 h-6"></p>
              <p className="bg-slate-600 w-[350px] mb-3 h-6"></p>
              <p className="mt-14 bg-slate-600 w-[350px] mb-3 h-6 text-gray-500 text-sm"></p>
            </div>
          </>
        ) : (
          <>
            <figure className="w-[50%] flex flex-col items-center justify-center">
              <img className="rounded" src={movieDetail.Poster} alt="" />
              <div className="flex flex-col items-center">
                <p className="pt-4">Rating: {movieDetail.imdbRating}</p>
                <p>Genre: {movieDetail.Genre} </p>
              </div>
            </figure>
            <div className="w-[50%] flex flex-col items-center">
              <h1 className="mb-24 text-4xl">{movieDetail.Title}</h1>
              <h2 className="mb-16 text-2xl">Summary</h2>
              <p>{movieDetail.Plot}</p>
              <p className="mt-14 text-gray-500 text-sm">
                Starring: {movieDetail.Actors}{" "}
              </p>
              <p className="pt-8">Rated [{movieDetail.Rated}]</p>
              <div className="pt-8">
                <button className="bg-[#D334AB] rounded-full p-2">Watch Now</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieInfo;
