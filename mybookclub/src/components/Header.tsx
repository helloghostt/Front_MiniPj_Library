import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';

const NavigationBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to="/">BookClub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/community">Community</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search books..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Header: React.FC = () => {
  return (
    <header>
      <NavigationBar />
    </header>
  );
};

export default Header;