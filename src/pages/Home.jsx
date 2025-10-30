import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch movies from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/movies");
        setMovies(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  // Search functionality
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(movies);
    } else {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
      if (results.length === 0) {
        setFiltered([
          {
            _id: "noresult",
            title: "Sorry Cinephile, That’s not listed",
            poster: "https://cdn-icons-png.flaticon.com/512/7486/7486769.png",
          },
        ]);
      } else {
        setFiltered(results);
      }
    }
  }, [search, movies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🎬 SFlix Movie World</h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-4 py-2 rounded-lg text-gray-900"
        />
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filtered.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
