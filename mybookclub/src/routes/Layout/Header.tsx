import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/Intro">Intro</Link>
          </li>
          <li>
            <Link to="/Notice">Notice</Link>
          </li>
          <li>
            <Link to="/Community">Community</Link>
          </li>
          <li>
            <Link to="/Membership">Membership</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;