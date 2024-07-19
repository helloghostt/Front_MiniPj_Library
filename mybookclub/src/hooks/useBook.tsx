import { useState, useEffect } from 'react';
import { Book } from '../types';
import * as api from '../services/api';

export const useBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const fetchedBooks = await api.fetchBooks();
      setBooks(fetchedBooks);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (query: string) => {
    try {
      setLoading(true);
      const searchResults = await api.searchBooks(query);
      setBooks(searchResults);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, fetchBooks, searchBooks };
};