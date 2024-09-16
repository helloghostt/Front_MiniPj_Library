import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import "../../styles/global.css";
import { useAuth } from "../../hooks/useAuth";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { login, signUp, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignUp = async () => {
    console.log("Sending signup request with email:", email);
    try {
      setErrorMessage(null);
      const success = await signUp(email);
      if (success) {
        navigate("/profile");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during sign up"
      );
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMessage(null);
      const success = await login(email);
      if (success) {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during login"
      );
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to BookClub</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
