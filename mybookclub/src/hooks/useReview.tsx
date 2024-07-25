import { useState, useCallback } from "react";
import { Review, Book } from "../types";
import * as api from "../services/api";
import { books as localBooks } from "../data/books";

export const useReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReviewedBooks, setUserReviewedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = useCallback(async (bookId: string) => {
    try {
      setLoading(true);
      const fetchedReviews = await api.getReviews(bookId);
      setReviews(fetchedReviews);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addReview = useCallback(
    async (bookId: string, content: string, rating: number) => {
      try {
        setLoading(true);
        const newReview = await api.addReview(bookId, content, rating);
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchUserReviewedBooks = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const userReviews = await api.getReviews(userId);
      const reviewedBookIds = userReviews.map(
        (review: Review) => review.bookId
      );
      const reviewedBooks = await Promise.all(
        reviewedBookIds.map((id: string) => api.getBookDetails(id))
      );
      setUserReviewedBooks(reviewedBooks);
      setError(null);
    } catch (error) {
      console.error("Error fetching user reviewed books:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReview = useCallback(
    async (reviewId: string, content: string, rating: number) => {
      try {
        setLoading(true);
        const updatedReview = await api.updateReview(reviewId, content, rating);
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? updatedReview : review
          )
        );
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteReview = useCallback(async (reviewId: string) => {
    try {
      setLoading(true);
      await api.deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reviews,
    userReviewedBooks,
    loading,
    error,
    fetchReviews,
    addReview,
    fetchUserReviewedBooks,
    updateReview,
    deleteReview,
  };
};
