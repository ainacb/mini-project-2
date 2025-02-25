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
  // Returns: movies – The list of movies fetched. loading – A boolean indicating if data is still loading. error – An error message if fetching fails.

  // Pagination Logic - Show only 12 movies per page
  const moviesPerPage = 12;
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie); // Slices the movies array to display only the movies for the active page

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
        search={searchInput} // Current search input
        setSearch={setSearchInput} // Function to update search input.
        handleSearch={handleSearch} // Function to submit search.
        tempFilters={tempFilters} // Temporary filters.
        setTempFilters={setTempFilters} // Function to update temporary filters.
      />
      {loading && <p className="loading">Loading movies...</p>}
      {/* If loading is true, it displays "Loading movies...". */}
      {error && <p className="error">{error}</p>}
      {/* If error exists, it displays the error message. */}

      <div className="movie-grid">
        {currentMovies.length > 0 ? ( // Checks if there are movies to display
          currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          )) // Maps over currentMovies and renders a MovieCard for each
        ) : (
          <p className="no-movies">No movies found.</p> // If no movies are found, it displays "No movies found."
        )}
      </div>
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage} // Active page number.
        totalMovies={movies.length} // Total number of fetched movies.
        moviesPerPage={moviesPerPage} // Number of movies per page.
        onPageChange={setCurrentPage} // Function to update the page.
      />
    </div>
  );
}

export default App;
