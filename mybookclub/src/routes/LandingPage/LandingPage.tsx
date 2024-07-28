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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    console.log("Sending signup request with email:", email);
    try {
      setErrorMessage(null);
      const success = await signUp(email);
      if (success) {
        // 회원가입 성공 후 프로필 페이지로 이동
        navigate("/profile");
      }
    } catch (error) {
      // 에러 처리
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
        // 에러 메시지를 사용자에게 표시
      }
    }
  }; // 가입하면 profile로 이동

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const success = await login(email);
    if (success) {
      navigate("/home"); // 로그인 후 homepage로 이동
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to BookClub</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="form-container">
        <Form className="signup-form" onSubmit={handleSignIn}>
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
            <Button variant="outline-light" disabled={isLoading} type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Sign In"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LandingPage;
