import { useState } from "react";
import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";
import Header from "./components/Header";
import useFetchBooks from "./hooks/useFetchBooks";
import CenteredSpinner from "./components/CenteredSpinner";
import "./App.css";

const App = () => {
  const [searchParams, setSearchParams] = useState({
    searchValue: "",
    searchType: "title",
    language: "en",
    sortType: "relevance",
  });
  
  const { books, loading, error, success } = useFetchBooks(searchParams);

  const handleSearch = (searchValue, searchType, language, sortType) => {
    setSearchParams({ searchValue, searchType, language, sortType });
  };

  return (
    <div role="main"> {/* Indicate main content for assistive technologies */}
      <Header />
      <BookSearch onSearch={handleSearch} searchParams={searchParams} />
      {loading && <CenteredSpinner />}
      {error && <p aria-live="assertive">Error: {error.message}</p>} {/* Announce error messages */}
      {success && <BookList books={books} />}
    </div>
  );
};

export default App;
