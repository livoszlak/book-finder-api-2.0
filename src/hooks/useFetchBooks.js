import { useState, useEffect } from "react";

const useFetchBooks = (searchParams) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!searchParams.searchValue) {
      setBooks([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);  // Clear error before starting new request
      setSuccess(false);
      const baseUrl = "https://www.googleapis.com/books/v1/volumes";
      const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

      let queryParam = "";
      if (searchParams.searchType === "title") {
        queryParam = `intitle:"${searchParams.searchValue}"`;
      } else if (searchParams.searchType === "author") {
        // Normalize the search value
        const normalizedSearchValue = searchParams.searchValue
          .replace(/\./g, "")
          .replace(/\s+/g, " ")
          .trim();
        const authorParts = normalizedSearchValue.split(" ");
        const authorQuery = authorParts.join(" ");
        queryParam = `inauthor:"${authorQuery}" OR inauthor:"${normalizedSearchValue}" OR inauthor:"${authorParts.join(
          ". "
        )}" OR inauthor:"${authorParts.join(".")}"`;
      } else if (searchParams.searchType === "subject") {
        queryParam = `subject:"${searchParams.searchValue}"`;
      }

      const apiSortType = "relevance";
      const fetchUrl = `${baseUrl}?q=${queryParam}&maxResults=40&langRestrict=${searchParams.language}&printType=books&orderBy=${apiSortType}&fields=items(id,volumeInfo(title,authors,description,imageLinks,canonicalVolumeLink,categories,publishedDate,publisher,pageCount,averageRating))&key=${key}`;

      try {
        const controller = new AbortController();  // Create an abort controller to manage timeouts
        const timeoutId = setTimeout(() => controller.abort(), 10000);  // 10 second timeout

        const response = await fetch(fetchUrl, { signal: controller.signal });
        clearTimeout(timeoutId);  // Clear timeout if fetch succeeds

        if (!response.ok) {
          // Handle HTTP status codes
          switch (response.status) {
            case 400:
              throw new Error("Bad request. Please check your search parameters.");
            case 403:
              throw new Error("API key is invalid or you have exceeded your quota.");
            case 404:
              throw new Error("No books found. Please try a different search.");
            case 500:
              throw new Error("Server error. Please try again later.");
            default:
              throw new Error(`Unexpected error: ${response.status}`);
          }
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          setBooks([]);
          throw new Error("No books matched your search.");
        }

        let uniqueBooks = data.items.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.volumeInfo.title === item.volumeInfo.title)
        );

        if (searchParams.sortType === "newest") {
          uniqueBooks.sort((a, b) => {
            const dateA = new Date(a.volumeInfo.publishedDate || "0");
            const dateB = new Date(b.volumeInfo.publishedDate || "0");
            return dateB - dateA;
          });
        }

        setBooks(uniqueBooks);
        setSuccess(true);

      } catch (err) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return { books, loading, error, success };
};

export default useFetchBooks;
