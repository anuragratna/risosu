import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const clients = [
    "Anza", "Thomas Cook", "SOTC", "Webville", "Lawrence and Mayo",
    "Optibyte Digital", "BSE Training institute", "FCI-CCM", "Newgen", "Vega",
    "ATP international", "Asian Paints", "Smart Box", "Hygge Energy",
    "Career Canada immigration Service Inc", "Harmony Creative Studio"
];
const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content container">
                    <h1>Building Future-Ready Teams for India’s High-Growth Sectors.</h1>
                    <h6>Empowering organizations to realize their true potential</h6>
                    <p className="hero-subtext">Unleashing potential with a decade of consulting brilliance</p>
                    <Link to="/careers" className="btn">Get Started</Link>
                </div>
            </section>

            <section className="clients-section container section">
                <div className="section-header">
                    <h2>Our Customers</h2>
                    <p style={{ marginTop: '1rem', color: '#64748b' }}>Trusted by industry leaders across the globe.</p>
                </div>
                <div className="clients-grid">
                    {clients.map((client, index) => (
                        <div key={index} className="client-logo-card">
                            <span className="client-name">{client}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-us container section">
                <div className="section-header">
                    <h2>About Us</h2>
                </div>

                <div className="about-grid">
                    <div className="about-card">
                        <h4>Who We Are</h4>
                        <p>Risosu is a skilled HR consulting firm that offers personalized solutions to businesses and organizations. With a strong vision to empower companies through effective HR practices and strategies, Risosu is committed to providing the finest talent across the industry.</p>
                    </div>

                    <div className="about-card">
                        <h4>Our Expertise</h4>
                        <p>We offer complete HR consulting services in recruitment, Manpower planning, compensation, training, performance, and more. By constantly striving for excellence, leveraging cutting-edge technology like AI and advanced analytics tools, we ensure precise and error-free work.</p>
                    </div>

                    <div className="about-card">
                        <h4>Why Us?</h4>
                        <p>Founded by a team of seasoned HR professionals with over a decade of industry experience, we have an in-depth understanding of our clients' needs and challenges. This expertise enables us to consistently deliver on time, addressing our clients' pain points effectively.</p>
                    </div>
                </div>
            </section>

            <section className="reviews container section">
                <h2>Reviews</h2>
                <p>See what our clients say about us.</p>
                                
        <section className="testimonials container section">
            <h2>Testimonials</h2>
            <div className="testimonial-card">
                <p className="testimonial-quote">
                    Risosu consistently delivers professional HR solutions, combining deep industry insight with a client‑focused approach. Their expertise ensures that talent acquisition aligns perfectly with business goals, making them a trusted partner.
                </p>
                <p className="testimonial-author">– Partner, Leading Organization</p>
            </div>
            <div className="testimonial-card">
                <p className="testimonial-quote">
                    The Risosu team excels in sourcing and recruitment, demonstrating exceptional organization, independence, and dedication. Their commitment drives successful outcomes and adds significant value to any organization.
                </p>
                <p className="testimonial-author">– Executive, Global Enterprise</p>
            </div>
        </section>
                        </section>
            </section>
        </div>
    );
};

export default Home;
