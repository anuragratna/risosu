import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content container">
                    <h1>Comprehensive HR Solutions</h1>
                    <h6>Empowering organizations to realize their true potential</h6>
                    <p className="hero-subtext">Unleashing potential with a decade of consulting brilliance</p>
                    <Link to="/careers" className="btn">Get Started</Link>
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
                {/* Placeholder for reviews */}
            </section>
        </div>
    );
};

export default Home;
