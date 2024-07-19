import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, coverImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/book/${id}`}
      className="book-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={coverImage} alt={title} className={isHovered ? 'hovered' : ''} />
      {isHovered && (
        <div className="book-info">
          <h3>{title}</h3>
          <p>{author}</p>
        </div>
      )}
    </Link>
  );
};

export default BookCard;