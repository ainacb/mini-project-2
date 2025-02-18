const Pagination = ({
  currentPage,
  totalMovies,
  moviesPerPage,
  onPageChange,
}) => {
  const indexOfLastMovie = currentPage * moviesPerPage;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀ Previous
      </button>
      <span> Page {currentPage} </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={indexOfLastMovie >= totalMovies}
      >
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
