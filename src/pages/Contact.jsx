import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page container section">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <h4>Get in Touch</h4>
                <p>At Risosu Consulting, we understand that every company is distinctive. We believe in providing solutions tailored precisely to meet your unique needs.</p>
            </div>

            <div className="contact-grid">
                {/* Section A: Who We Are / Leadership */}
                <div className="contact-info">
                    <h3>Who We Are</h3>
                    <div className="leadership-card" style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Vandana Saxena</h4>
                        <p style={{ fontStyle: 'italic', color: '#666' }}>Founder and Director</p>
                        <p style={{ marginTop: '1rem' }}>
                            Leading Risosu Consulting with a vision to transform HR and recruitment processes through innovative technology and personalized service.
                        </p>
                    </div>
                </div>

                {/* Section B: Contact Details */}
                <div className="contact-info">
                    <h3>Risosu Consulting LLP</h3>
                    <div style={{ marginTop: '1.5rem' }}>
                        <p style={{ marginBottom: '1rem' }}><strong>Location:</strong><br /> Mumbai, India</p>
                        <p style={{ marginBottom: '1rem' }}><strong>Email:</strong><br /> <a href="mailto:connect@risosu.com">connect@risosu.com</a></p>
                        <p style={{ marginBottom: '1rem' }}><strong>Phone:</strong><br /> <a href="tel:+918655263150">+91 8655-263-150</a></p>

                        <div className="whatsapp-btn-container" style={{ marginTop: '2rem' }}>
                            <a href="https://wa.me/918655263150" className="btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                                Message us on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
