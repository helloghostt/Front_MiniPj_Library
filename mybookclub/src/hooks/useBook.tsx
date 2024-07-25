import { useState, useEffect, useCallback } from "react";
import { Book, Review } from "../types";
import * as api from "../services/api";
import { books as localBooks } from "../data/books";

const useBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<Book[]>([]); //review작성한것만 프로필로
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      console.log(
        "REACT_APP_USE_LOCAL_DATA:",
        process.env.REACT_APP_USE_LOCAL_DATA
      );
      if (process.env.REACT_APP_USE_LOCAL_DATA === "true") {
        console.log("Using local data");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async
        setBooks(localBooks);
      } else {
        console.log("Using API data");
        const fetchedBooks = await api.fetchBooks();
        setBooks(fetchedBooks);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const fetchBookDetails = useCallback(async (bookId: string) => {
    setLoading(true);
    try {
      let bookDetails: Book;
      if (process.env.REACT_APP_USE_LOCAL_DATA === "true") {
        // 로컬 데이터에서 책 찾기
        bookDetails = localBooks.find((book) => book.id === bookId) as Book;
        await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 지연
      } else {
        // API 호출
        bookDetails = await api.getBookDetails(bookId);
      }
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? bookDetails : book))
      );
      setError(null);
    } catch (err) {
      setError(new Error("Failed to fetch book details"));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserReviewedBooks = useCallback(
    async (userId: string): Promise<Book[]> => {
      setLoading(true);
      try {
        if (process.env.REACT_APP_USE_LOCAL_DATA === "true") {
          // 로컬 데이터를 사용한 시뮬레이션
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
          return localBooks.slice(0, 3); // 예시로 처음 3개의 책을 반환
        } else {
          const userReviews = await api.getReviews(userId);
          const reviewedBookIds = userReviews.map(
            (review: Review) => review.bookId
          );
          return await Promise.all(
            reviewedBookIds.map((id: string) => api.getBookDetails(id))
          );
        }
      } catch (error) {
        console.error("Error fetching user reviewed books:", error);
        setError(error as Error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // const removeFromReadingList = useCallback(
  //   async (userId: string, bookId: string) => {
  //     try {
  //       await api.removeFromReadingList(userId, bookId);
  //       setReadingList((prev) => prev.filter((b) => b.id!== bookId));
  //     } catch (error) {
  //       console.error("Error removing book from reading list:", error);
  //     }
  //   },
  // );

  const addToReadingList = useCallback(
    async (userId: string, bookId: string) => {
      try {
        if (process.env.REACT_APP_USE_LOCAL_DATA !== "true") {
          await api.addToReadingList(userId, bookId);
        }
        const book = books.find((b) => b.id === bookId);
        if (book) {
          setReadingList((prev) => [...prev, book]);
        }
      } catch (error) {
        console.error("Error adding book to reading list:", error);
      }
    },
    [books]
  );

  const fetchReadingList = useCallback(async (userId: string) => {
    try {
      if (process.env.REACT_APP_USE_LOCAL_DATA === "true") {
        // 로컬 데이터를 사용한 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
        setReadingList(localBooks.slice(0, 2)); // 예시로 처음 2개의 책을 반환
      } else {
        const list = await api.getReadingList(userId);
        setReadingList(list);
      }
    } catch (error) {
      console.error("Error fetching reading list:", error);
    }
  }, []);

  const searchBooks = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const searchResults = await api.searchBooks(query);
      const formattedBooks: Book[] = searchResults.map((item: any) => ({
        id: item.isbn,
        title: item.title,
        author: item.author,
        coverImage: item.image,
        description: item.description,
      }));
      setBooks(formattedBooks);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    books,
    loading,
    error,
    searchBooks,
    readingList,
    addToReadingList,
    fetchReadingList,
    fetchBooks,
    fetchBookDetails,
    fetchUserReviewedBooks,
  };
};

export default useBook;
