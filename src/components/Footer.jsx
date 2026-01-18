import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-content">
                    <h3>Risosu Consulting</h3>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © {new Date().getFullYear()} Risosu Consulting - All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
