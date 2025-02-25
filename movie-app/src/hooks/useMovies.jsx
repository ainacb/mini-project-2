import { useState, useEffect } from "react";
import axios from "axios";

// useMovie is a custom React hook is responsible for fetching, filtering, and sorting
// movie data from The Movie Database (TMDb) API based on the search query and filters provided by the user

const API_KEY = "60f45e8a320b7c2b04d3682cd770db13";
const BASE_URL = "https://api.themoviedb.org/3";

const useMovies = (query, filters) => {
  const [movies, setMovies] = useState([]); // stores the list of movies fetched from TMD
  const [loading, setLoading] = useState(false); // tracks whether the API request is in progress
  const [error, setError] = useState(null); // stores error messages if the request fails.

  useEffect(() => {
    if (!query) return; // prevent fetching when no query (initial state)

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        let allMovies = []; // Store combined movies from multiple pages (up to 3 pages)

        // Fetch up to 3 pages (60 movies total)
        for (let page = 1; page <= 3; page++) {
          let url = query
            ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`; // If no query exists, it fetches popular movies.

          if (
            filters.sortBy &&
            filters.sortBy !== "release_date.desc" &&
            filters.sortBy !== "release_date.asc"
          ) {
            url += `&sort_by=${filters.sortBy}`;
          }

          const response = await axios.get(url);
          allMovies = [...allMovies, ...response.data.results];

          if (allMovies.length >= 60) break; // Stop fetching if 60 movies reached
        }

        let filteredMovies = allMovies.slice(0, 60); // Limit to 60 results

        // Apply Language Filter
        if (filters.language) {
          filteredMovies = filteredMovies.filter(
            (movie) => movie.original_language === filters.language
          );
        }

        // Apply Age Rating Filter (TMDb does not have direct ratings, so using `adult` flag).
        // true → R-rated movies.
        // false → Everything else (G, PG, PG-13, etc.).
        if (filters.ageRating) {
          if (filters.ageRating === "R") {
            filteredMovies = filteredMovies.filter((movie) => movie.adult);
          } else {
            filteredMovies = filteredMovies.filter((movie) => !movie.adult);
          }
        }

        // Fix Release Date Sorting (Manually Sort)
        if (filters.sortBy === "release_date.desc") {
          filteredMovies = filteredMovies
            .filter((movie) => movie.release_date) // Ensure valid release dates
            .sort(
              (a, b) => new Date(b.release_date) - new Date(a.release_date)
            );
        } else if (filters.sortBy === "release_date.asc") {
          filteredMovies = filteredMovies
            .filter((movie) => movie.release_date) // Ensure valid release dates
            .sort(
              (a, b) => new Date(a.release_date) - new Date(b.release_date)
            );
        }

        setMovies(filteredMovies);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      }

      setLoading(false);
    };

    fetchMovies();
  }, [query, filters]); // Re-fetch when query or filters change

  return { movies, loading, error };
};

export default useMovies;
