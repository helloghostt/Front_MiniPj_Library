import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Book } from "../types";

export const useBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const fetchedBooks = await api.fetchBooks();
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      setError(err as Error);
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
    searchBooks: async (query: string) => {
      setLoading(true);
      try {
        const searchedBooks = await api.searchBooks(query);
        setBooks(searchedBooks);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
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
    fetchUserReviewedBooks: async (userId: string) => {
      setLoading(true);
      try {
        const fetchedUserReviews = await api.getReviews(userId, "", 0);
        const reviewedBookIds = fetchedUserReviews.map(
          (review: { bookId: string }) => review.bookId
        );
        const reviewedBooks = books.filter((book) =>
          reviewedBookIds.includes(book.id)
        );
        setError(null);
        return reviewedBooks;
      } catch (err) {
        setError(err as Error);
        return [];
      } finally {
        setLoading(false);
      }
    },
  };
};
