import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Alert, Spinner } from "react-bootstrap";
import "../../styles/global.css";
import BookList from "../../components/BookList";
import { useAppContext } from "../../contexts/AppContext";
import { Book } from "../../types";

const Profile: React.FC = () => {
  const {
    auth: { currentUser, logout, isAdmin },
    book: { fetchUserReviewedBooks, loading },
  } = useAppContext();
  const [userReviewedBooks, setUserReviewedBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserReviewedBooks = async () => {
      if (currentUser) {
        try {
          const books = await fetchUserReviewedBooks(currentUser.id);
          setUserReviewedBooks(books);
          setError(null);
        } catch (err) {
          setError("Failed to load reviewed books. Please try again.");
        }
      }
    };

    loadUserReviewedBooks();
  }, [currentUser, fetchUserReviewedBooks]);

  if (!currentUser)
    return <Alert variant="warning">Please log in to view your profile.</Alert>;

  const handleSignOut = () => {
    logout();
    navigate("/"); // 로그아웃 후 랜딩페이지로 이동
  };

  return (
    <div className="profile-page">
      <h2>
        Welcome, {currentUser.username}!
        <Button variant="outline-danger" onClick={handleSignOut}>
          Sign Out
        </Button>
      </h2>
      <div className="user-info">
        <img
          src={`https://picsum.photos/seed/${currentUser.id}/200/200`}
          alt={currentUser.username}
          className="profile-picture"
        />
        <div className="user-details">
          <p>Email: {currentUser.email}</p>
          <p>
            Member since: {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="reading-list">
        <h3>Your Reading List</h3>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : userReviewedBooks.length > 0 ? (
          <BookList books={userReviewedBooks} />
        ) : (
          <Alert variant="info">You haven't reviewed any books yet.</Alert>
        )}
      </div>
      {isAdmin() && (
        <div className="admin-section">
          <h3>Admin Dashboard</h3>
          <p>관리자 기능은 여기에 구현됩니다.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
