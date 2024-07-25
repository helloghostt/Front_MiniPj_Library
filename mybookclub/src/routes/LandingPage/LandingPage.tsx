import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import "../../styles/global.css";
import { useAppContext } from "../../contexts/AppContext";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const {
    auth: { login, signUp, currentUser, isLoading, error, isAdmin },
  } = useAppContext();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const success = await signUp(email);
    if (success) {
      navigate("/profile"); // 가입하면 profile로 이동
    }
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const success = await login(email);
    if (success) {
      navigate("/home"); // 로그인 후 homepage로 이동
    }
  };

  if (currentUser) {
    return (
      <div className="landing-page">
        <h1>Welcome, {currentUser.username}</h1>
        <p>You are logged in as: {isAdmin() ? "Admin" : "User"}</p>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <h1>Welcome to BookClub</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="form-container">
        <Form className="signup-form">
          <Form.Group className="email-input">
            <Form.Control
              type="email"
              placeholder="Enter your email (Enter-key means SignIn)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <div className="button-group">
            <Button
              variant="outline-light"
              onClick={handleSignUp}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
            </Button>
            <Button
              variant="outline-light"
              onClick={handleSignIn}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Sign In"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LandingPage;
