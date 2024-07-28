import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { Review } from "../types";

export const useReview = (bookId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedReviews = await api.getReviews(bookId, "", 0);
      setReviews(fetchedReviews);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (content: string, rating: number) => {
    try {
      setLoading(true);
      const newReview = await api.getReviews(bookId, content, rating);
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (
    reviewId: string,
    content: string,
    rating: number
  ) => {
    try {
      setLoading(true);
      await api.updateReview(reviewId, content, rating);
      const updatedReviews = reviews.map((review) =>
        review.id === reviewId ? { ...review, content, rating } : review
      );
      setReviews(updatedReviews);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      await api.deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
    updateReview,
    deleteReview,
  };
};
