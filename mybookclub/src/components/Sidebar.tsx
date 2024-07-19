import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2>Book Categories</h2>
      <ul>
        <li>
          <Link to="/books/popular">Popular Books</Link>
        </li>
        <li>
          <Link to="/books/recommended">Recommended Books</Link>
        </li>
      </ul>
      
      <h2>Genres</h2>
      <ul>
        <li><Link to="/genre/fiction">Fiction</Link></li>
        <li><Link to="/genre/non-fiction">Non-Fiction</Link></li>
        <li><Link to="/genre/mystery">Mystery</Link></li>
        <li><Link to="/genre/sci-fi">Science Fiction</Link></li>
        <li><Link to="/genre/romance">Romance</Link></li>
        {/* Add more genres as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;