import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../../styles/global.css'

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to BookClub</h1>
      <div className='btn-box-landing'>
        <Form>
          <Form.Group>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Button variant="primary">Sign Up</Button>
          <Button variant="primary">Sign In</Button>
        </Form>
      </div>

    </div>
  );
};

export default LandingPage;