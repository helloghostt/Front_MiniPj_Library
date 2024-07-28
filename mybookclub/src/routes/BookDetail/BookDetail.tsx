import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { Review } from "../../types";
import "../../styles/global.css";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    book: { books, loading: bookLoading, error: bookError, fetchBookDetails },
    auth: { currentUser },
    review: {
      reviews,
      loading: reviewLoading,
      error: reviewError,
      fetchReviews,
      addReview,
      updateReview,
      deleteReview,
    },
  } = useAppContext();

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBookDetails(id);
      fetchReviews();
    }
  }, [id, fetchBookDetails, fetchReviews]);

  if (bookLoading || reviewLoading) return <div>Loading...</div>;
  if (bookError) return <div>Error: {bookError.message}</div>;
  if (reviewError)
    return <div>Error loading reviews: {reviewError.message}</div>;

  const book = books.find((b) => b.id === id);
  if (!book) return <div>Book not found</div>;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && newReview.trim() && id) {
      try {
        if (editingReviewId) {
          await updateReview(editingReviewId, newReview, rating);
          setEditingReviewId(null);
        } else {
          await addReview(newReview, rating);
        }
        setNewReview("");
        setRating(5);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReviewId(review.id);
    setNewReview(review.content);
    setRating(review.rating);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(reviewId);
    }
  };

  return (
    <div className="book-detail">
      <div className="book-display">
        <h1>{book.title}</h1>
        <img src={book.coverImage} alt={book.title} />
        <p>Author: {book.author}</p>
        <p>Description: {book.description}</p>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <p>{review.content}</p>
            <p>Rating: {review.rating}/5</p>
            <p>By: {review.author}</p>
            {currentUser && currentUser?.id === review.userId && (
              <div>
                <button onClick={() => handleEditReview(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {currentUser && (
        <form onSubmit={handleSubmitReview}>
          <label htmlFor="review-content">Your Review:</label>
          <textarea
            id="review-content"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your thoughts here"
            required
          />
          <label htmlFor="review-rating">Rating:</label>
          <select
            id="review-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button type="submit">
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookDetail;
