import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types/index";
import "../styles/global.css";
import { BookCardProps } from "../types/index";
import axios from "axios";

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  coverImage,
}) => {
  return (
    <Link to={`/book/${id}`} className="book-card">
      <img src={coverImage} alt={title} />
      <div className="book-info">
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
    </Link>
  );
};

export default BookCard;
