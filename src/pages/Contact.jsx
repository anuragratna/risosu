import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page container section">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <h4>Get started today!</h4>
                <p>At Risosu Consulting, we understand that every company is distinctive, with its specific requirements for support, connectivity, and security. We believe in providing solutions tailored precisely to meet your unique needs.</p>
            </div>

            <div className="contact-grid">
                <div className="contact-info">
                    <h3>Risosu Consulting LLP</h3>
                    <p><strong>Location:</strong> Mumbai</p>
                    <p><strong>Email:</strong> <a href="mailto:connect@risosu.com">connect@risosu.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+918655263150">+91 8655-263-150</a></p>
                    <div className="whatsapp-btn-container">
                        <a href="https://wa.me/918655263150" className="btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                            Message us on WhatsApp
                        </a>
                    </div>
                </div>

                <div className="hiring-section">
                    <h3>We're Hiring!</h3>
                    <p>Join Our Team. If you're interested in one of our open positions, start by applying here and attaching your resume.</p>
                    <ul>
                        <li>Mobile Application Developer</li>
                        <li>Sr Java Developer</li>
                    </ul>
                    <button className="btn apply-btn">Apply Now</button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
