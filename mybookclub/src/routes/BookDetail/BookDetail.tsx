import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../../types/index';
import { useBook } from '../../hooks/useBook';
import { useReview } from '../../hooks/useReview';


const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, loading, error } = useBook();
  const [book, setBook] = useState<Book | null>(null);
  const { reviews, fetchReviews } = useReview();

  useEffect(() => {
    if (id) {
      const foundBook = books.find(b => b.id === id);
      if (foundBook) {
        setBook(foundBook);
      }
      fetchReviews(id);
    }
  }, [id, books, fetchReviews]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="book-detail">
      {book ? (
        <>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Rating: {book.rating}</p>
          <a href={book.purchaseLink}>Buy Now</a>
          {/* TODO: Add review form and comments section */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetail;