import { useState } from "react";
import Box from "@mui/material/Box";
import BookItem from "./BookItem";
import Paginate from "./Paginate";

const BookList = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box
        className="data-wrapper"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
        role="region" // Indicate this is a region of related content
        aria-labelledby="book-list-title" // Link to the heading
      >
        <h2 id="book-list-title" style={{ display: 'none' }}>Book List</h2> {/* Hidden heading for screen readers */}
        {currentBooks.map((book, index) => (
          <BookItem key={book.id || index} book={book} />
        ))}
      </Box>
      <Box
        className="pagination-wrapper"
        sx={{ display: "flex", justifyContent: "center" }}
        role="navigation" // Indicate this is a navigation region
        aria-label="Pagination controls" // Provide a label for navigation
      >
        <Paginate
          booksPerPage={booksPerPage}
          totalBooks={books.length}
          paginate={paginate}
        />
      </Box>
    </>
  );
};

export default BookList;
