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
                        <div style={{ marginTop: '1rem' }}>
                            <a href="https://www.linkedin.com/in/vandana-saxena-87793b1a/" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>Connect on LinkedIn</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg>
                            </a>
                        </div>
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
