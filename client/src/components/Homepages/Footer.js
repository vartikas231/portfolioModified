import React from 'react';

const Footer = () => {
  return (
    <footer className="vs-footer">
      <div className="vs-footer-content">
        <div className="vs-footer-section">
          <h3 className="vs-footer-title">Connect</h3>
          <div className="vs-footer-social-links">
            <a href="/#" className="vs-footer-social-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/#" className="vs-footer-social-link" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a 
              href="https://www.linkedin.com/in/vartika-sharma-b41670204/" 
              className="vs-footer-social-link" 
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="vs-footer-bottom">
        <p className="vs-footer-copyright">&copy; 2023 Vartika Sharma. All rights reserved.</p>
      </div>
      <div className="vs-footer-tech-decoration">
        <div className="vs-footer-circuit-line"></div>
        <div className="vs-footer-circuit-dot"></div>
        <div className="vs-footer-circuit-line"></div>
        <div className="vs-footer-circuit-dot"></div>
        <div className="vs-footer-circuit-line"></div>
      </div>
    </footer>
  );
};

export default Footer;