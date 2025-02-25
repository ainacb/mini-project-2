import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  search, // current search input value
  setSearch, // function to update the search input value
  handleSearch, // function to execute the search when the form is submitted
  tempFilters, // temporary state object storing filter selections before applying them
  setTempFilters, // function to update the temporary filters
}) => {
  return (
    <form onSubmit={handleSearch} className="search-form">
      {/* onSubmit={handleSearch} ensures that when the form is submitted, it triggers the handleSearch function. */}
      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Language Filter */}
      <select
        className="filter-select"
        value={tempFilters.original_language}
        onChange={(e) =>
          setTempFilters({ ...tempFilters, language: e.target.value })
        }
      >
        <option value="">Language</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
      </select>

      {/* Age Rating Filter */}
      <select
        className="filter-select"
        value={tempFilters.ageRating}
        onChange={(e) =>
          setTempFilters({ ...tempFilters, ageRating: e.target.value })
        }
      >
        <option value="">Age Rating</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
      </select>

      {/* Sorting Option */}
      <select
        className="filter-select"
        value={tempFilters.sortBy}
        onChange={(e) =>
          setTempFilters({ ...tempFilters, sortBy: e.target.value })
        }
      >
        <option value="">Sort By</option>
        <option value="vote_average.desc">Highest Rated</option>
        <option value="release_date.desc">
          Release Date (Newest to Oldest)
        </option>
        <option value="release_date.asc">
          Release Date (Oldest to Newest)
        </option>
      </select>

      {/* Search Button */}
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
