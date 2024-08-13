import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Book } from "../types";

export const useBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBooks = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await api.fetchBooks(page);
      setBooks(response);
      setTotalPages(calculateTotalPages(response.length));
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  const searchBooks = async (query: string, page: number = 1) => {
    setLoading(true);
    try {
      const response = await api.searchBooks(query, page);
      setBooks(response);
      setTotalPages(calculateTotalPages(response.length));
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPages = (totalItems: number) => {
    const itemsPerPage = 20; // 페이지당 아이템 수
    return Math.ceil(totalItems / itemsPerPage);
  };

  const fetchUserReviewedBooks = async (userId: string) => {
    setLoading(true);
    try {
      const fetchedUserReviews = await api.getReviews(userId);
      const reviewedBookIds = fetchedUserReviews.map(
        (review: { bookId: string }) => review.bookId
      );
      const reviewedBooks = await Promise.all(
        reviewedBookIds.map((bookId: string) => api.getBookDetails(bookId))
      );
      setError(null);
      return reviewedBooks;
    } catch (err) {
      console.error("Error fetching user reviewed books:", err);
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    readingList,
    totalPages,
    currentPage,
    setCurrentPage,
    searchBooks,
    addToReadingList: async (userId: string, bookId: string) => {
      const existingBookIndex = readingList.findIndex(
        (book) => book.id === bookId
      );
      if (existingBookIndex === -1) {
        const bookToAdd = books.find((book) => book.id === bookId);
        if (bookToAdd) {
          setReadingList([...readingList, bookToAdd]);
        }
      }
      setBooks(books.filter((book) => book.id !== bookId));
    },
    fetchReadingList: async (userId: string) => {
      setLoading(true);
      try {
        const fetchedReadingList = await api.getReadingList(userId);
        setReadingList(fetchedReadingList);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    fetchBooks,
    fetchBookDetails: async (bookId: string) => {
      setLoading(true);
      try {
        const fetchedBookDetails = await api.getBookDetails(bookId);
        setBooks(fetchedBookDetails);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    fetchUserReviewedBooks,
  };
};
