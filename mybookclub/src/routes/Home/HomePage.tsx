import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Form,
} from "react-bootstrap";
import "../../styles/global.css";
import { useAppContext } from "../../contexts/AppContext";
import BookCard from "../../components/BookCard";
import { Book } from "../../types";
import * as api from "../../services/api";

const HomePage: React.FC = () => {
  const {
    book: { books, loading, error, searchBooks },
  } = useAppContext();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks(query);
  };

  const renderBooks = () => {
    if (books.length === 0) {
      return <Alert variant="info">No books available at the moment.</Alert>;
    }
    return (
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
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

  return (
    <Container className="home-page">
      <h1 className="text-center my-4">🌱 BookList 🌱</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <div className="search-box">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search for books"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="mt-2">
              Search
            </Button>
          </Form.Group>
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
        </div>
      )}
    </Container>
  );
};

export default HomePage;
