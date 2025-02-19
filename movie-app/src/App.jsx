import { useState, useEffect } from "react";
import useMovies from "./hooks/useMovies";
import "./App.css";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

function App() {
  const [searchInput, setSearchInput] = useState(""); // User input in search bar
  const [searchQuery, setSearchQuery] = useState(""); // Triggers API request when search bar is submitted
  const [filters, setFilters] = useState({
    language: "",
    ageRating: "",
    sortBy: "",
  }); // Stores Active filters

  const [tempFilters, setTempFilters] = useState(filters); // Temporary filters until submit
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page for pagination

  const { movies, loading, error } = useMovies(searchQuery, filters); // Fetch movies based on searchQuery and filters

  // Pagination Logic - Show only 12 movies per page
  const moviesPerPage = 12;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput); // Update query only when button is clicked
    setFilters(tempFilters); // Apply filters only on submit
    setCurrentPage(1); // Reset to page 1
  };

  return (
    <div className="container">
      <h1 className="title">Movie Finder</h1>
      <SearchBar // Renders searchBar component, props passed to searchBar
        search={searchInput}
        setSearch={setSearchInput}
        handleSearch={handleSearch}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
      />
      {loading && <p className="loading">Loading movies...</p>}
      {/* If loading is true, it displays "Loading movies...". */}
      {error && <p className="error">{error}</p>}
      {/* If error exists, it displays the error message. */}

      <div className="movie-grid">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="no-movies">No movies found.</p>
        )}
      </div>
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalMovies={movies.length}
        moviesPerPage={moviesPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
