import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Connect With Us</h3> 
          <div className="social-icons">
            <div className='git_icon'>
            <a href="https://github.com/helloghostt/Front_MiniPj_Library" target="_blank" rel="noopener noreferrer"><img src="\image\github_logo.png" alt="githubLogo" height="20px"/></a>
            </div>
            <div className='velog_icon'>
            <a href="https://velog.io/@mathdev/" target="_blank" rel="noopener noreferrer"><img src="/image/velogicon.png" alt="velogIcon" height="20px" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
      <p>&copy; Book Club Co.Ltd </p>
      </div>
    </footer>
  );
};
export default Footer;