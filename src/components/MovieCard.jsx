const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
      <img
        src={movie.poster}
        alt={movie.title}
        className="rounded-lg w-full h-64 object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
      <p className="text-sm text-gray-400">{movie.genre}</p>
    </div>
  );
};

export default MovieCard;
