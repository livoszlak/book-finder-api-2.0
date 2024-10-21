import { Pagination, Box } from "@mui/material";

const Paginate = ({ booksPerPage, totalBooks, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Box
      role="navigation" // Indicate that this is a navigation section
      aria-label="Pagination controls" // Provide a label for the navigation
    >
      <Pagination
        count={pageNumber.length}
        onChange={(e, p) => paginate(p)}
        aria-label="Page navigation" // Provide an accessible label for pagination
      />
    </Box>
  );
};

export default Paginate;
