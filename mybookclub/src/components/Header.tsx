import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import "../styles/global.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Form className="d-flex mx-auto search-form" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search books..."
        className="me-2"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

const Header: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();

  const handleNavClick = (path: string) => {
    navigate(path);
    setExpanded(false);
  };

  const handleLogoClick = () => {
    setExpanded(false);
    navigate(currentUser ? "/home" : "/");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          as="div"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <div className="bookclub_logo">
            <img src="/image/bookclub_logo.png" alt="BookClub Logo" />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/community">
                Community
              </Nav.Link>
            )}
          </Nav>
          {currentUser && <SearchBar />}
        </Navbar.Collapse>

        {currentUser && (
          <div className="user-icon ms-2">
            <Link to="/profile">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </Link>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
