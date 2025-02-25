const Pagination = ({
  currentPage, //currently active page number
  totalMovies, // total number of movies available
  moviesPerPage, // number of movies displayed per page
  onPageChange, // function that updates the currentPage when next or previous is clicked
}) => {
  const indexOfLastMovie = currentPage * moviesPerPage; // calculates the index of the last movie on the current page, helps determine if there are more movies left to display.

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // prevents navigation if the user is already on page 1.
      >
        ◀ Previous
      </button>
      <span> Page {currentPage} </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={indexOfLastMovie >= totalMovies} //  prevents navigation if there are no more movies left.
      >
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
