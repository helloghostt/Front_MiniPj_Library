import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Form,
  Pagination,
} from "react-bootstrap";
import "../../styles/global.css";
import { useAppContext } from "../../contexts/AppContext";
import BookCard from "../../components/BookCard";
import { useBook } from "../../hooks/useBook";
import { Book } from "../../types";
import { api } from "../../services/api";

const HomePage: React.FC = () => {
  const {
    book: { books, loading, error, searchBooks },
  } = useAppContext();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchBooks } = useBook();
  const booksPerPage = 20;

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setCurrentPage(1);
    await searchBooks(query);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderBooks = () => {
    if (books.length === 0) {
      return <Alert variant="info">No books found matching your search.</Alert>;
    }
    return (
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <BookCard
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{pageNumbers}</Pagination>;
  };

  return (
    <Container className="home-page">
      <h1 className="text-center my-4">🌱 BookList 🌱</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <div className="search-box">
          <Form.Control
            type="text"
            placeholder="Search for books"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit"> Search</Button>
        </div>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">
          Error: {error.message}
          <br />
          {error.stack}
        </Alert>
      ) : (
        <div className="book-list">
          <h2 className="text-center mb-4">Search Results</h2>
          {renderBooks()}
          <div className="d-flex justify-content-center mt-4">
            {renderPagination()}
          </div>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
