import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../styles/global.css";

const About: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { email, message });
    alert("Your message has been sent!");
    // Reset form fields
    setEmail("");
    setMessage("");
  };

  return (
    <div className="About">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/bg182-1584x396.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="aboutclub">
          <img src="image/bookclub_logo.png" alt="logo" />
          <div className="aboutclub-info">
            <h1>About Book Club</h1>
            <p>
              Book Club is a community for book lovers to discover, share, and
              discuss their favorite books.
            </p>
          </div>
        </div>
        <div className="slogan-container">
          <h2>"Read. Share. Connect."</h2>
          <div className="slogan-info">
            <p>
              * Reading books
              <br />
              * Sharing thoughts and reviews
              <br />* Connecting with others in the community
            </p>
          </div>
        </div>
        <div className="contact-container">
          <h2>Get in touch</h2>
          <p>We'd love to hear from you</p>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default About;
