import React from "react";
import { Book } from "../types/index";
import BookCard from "./BookCard";
import { BookListProps } from "../types/index";

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          coverImage={book.coverImage}
        />
      ))}
    </div>
  );
};

export default BookList;
