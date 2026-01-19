import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/images/logo.jpg" alt="Risosu Consulting" className="logo-img" />
        </Link>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
            <li><Link to="/more" onClick={() => setIsMenuOpen(false)}>More</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
