import { useState, useEffect } from 'react';
import { Review } from '../types';
import * as api from '../services/api';

export const useReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchReviews = async (bookId: string) => {
    try {
      setLoading(true);
      const fetchedReviews = await api.getReviews(bookId);
      setReviews(fetchedReviews);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (bookId: string, content: string, rating: number) => {
    try {
      setLoading(true);
      const newReview = await api.addReview(bookId, content, rating);
      setReviews(prevReviews => [...prevReviews, newReview]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { reviews, loading, error, fetchReviews, addReview };
};