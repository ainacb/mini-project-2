const MovieCard = ({ movie }) => {
  // Placeholder Image
  const placeHolderImage =
    "https://placehold.co/380x570?text=No+Poster+Available";

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : placeHolderImage
        }
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-info">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} | 📅{" "}
          {movie.release_date || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
