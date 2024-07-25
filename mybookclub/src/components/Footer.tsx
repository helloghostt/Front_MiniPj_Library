import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section social-icons">
          <a href="https://github.com/helloghostt/Front_MiniPj_Library" target="_blank" rel="noopener noreferrer"><img src="\image\github_logo.png" alt="githubLogo" height="20px"/></a>
          <a href="https://velog.io/@mathdev/" target="_blank" rel="noopener noreferrer"><img src="/image/velogicon.png" alt="velogIcon" height="20px" /></a>
        </div>
        <div className="footer-section-copyright">
          <p>&copy; 2024 Book Club Co.Ltd </p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;