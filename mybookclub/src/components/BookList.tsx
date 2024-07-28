import React, { useState, useEffect } from "react";
import { Book } from "../types/index";
import BookCard from "./BookCard";
import { BookListProps } from "../types/index";
import axios from "axios";

const BookList: React.FC<BookListProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>(
          "http://localhost:8000/api/books/"
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

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
