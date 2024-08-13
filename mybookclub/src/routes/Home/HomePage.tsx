import React, { useState, useEffect } from "react";
// import Pagination from 'react-js-pagination';
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
    book: { searchBooks },
  } = useAppContext();

  // 로컬 상태 관리
  const [query, setQuery] = useState(""); // 검색 쿼리
  const [hasSearched, setHasSearched] = useState(false); // 검색 수행 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [books, setBooks] = useState<Book[]>([]); // 책 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<Error | null>(null); // 로컬 에러 상태

  const { fetchBooks, totalPages } = useBook(); // 책 데이터를 가져오는 커스텀 훅
  const booksPerPage = 20; // 페이지당 표시할 책 수

  // 컴포넌트 마운트 시 책 데이터를 가져옵니다
  useEffect(() => {
    setLoading(true);
    fetchBooks()
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Fetched data is not an array:", data);
          throw new Error("Fetched data is not an array");
        }
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchBooks]);

  // 검색 폼 제출 핸들러
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setCurrentPage(1);
    await searchBooks(query);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (hasSearched) {
      searchBooks(query, pageNumber);
    } else {
      fetchBooks(pageNumber);
    }
  };

  // 페이지네이션을 위한 현재 페이지의 책 목록 계산
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 책 목록 렌더링 함수
  const renderBooks = () => {
    if (books.length === 0 && !loading && !error) {
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

  // 페이지네이션 컴포넌트 렌더링 함수
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
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

  // 컴포넌트 UI 렌더링
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
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
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
        // 책 목록 및 페이지네이션 표시
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
