import React from 'react';
import { Review } from '../types';


interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <img src={`https://picsum.photos/seed/${review.userId}/50/50`} alt="User" className="user-avatar" />
        <div className="review-meta">
          <p className="user-name">{review.userName}</p>
          <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="review-content">
        <p>{review.content}</p>
      </div>
      <div className="review-rating">
        Rating: {review.rating}/5
      </div>
    </div>
  );
};

export default ReviewCard;