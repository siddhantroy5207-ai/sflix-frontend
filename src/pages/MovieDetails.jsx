import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function MovieDetails(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch();
  }, [id]);

  const fetch = async () => {
    const res = await api.get(`/movies/${id}`);
    setMovie(res.data);
  };

  if (!movie) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <img src={movie.posterUrl} alt={movie.title} className="rounded shadow" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2"><strong>Director:</strong> {movie.director}</p>
          <p className="text-gray-400"><strong>Genre:</strong> {movie.genre?.name || "—"}</p>
          <p className="text-gray-400"><strong>Release:</strong> {movie.releaseYear}</p>
          <p className="mt-4">{movie.synopsis}</p>

          <div className="mt-6">
            <a className="bg-red-600 px-4 py-2 rounded" href={movie.trailerUrl} target="_blank" rel="noreferrer">
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
