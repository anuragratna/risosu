import React from 'react';
import './Services.css';

const Services = () => {
    return (
        <div className="services-page container section">
            <div className="section-header">
                <h1>Our Services</h1>
                <p>Tailored HR solutions to drive your business forward</p>
            </div>

            <div className="services-list">
                <div className="service-item">
                    <div className="service-content">
                        <h3>Talent Acquisition and Staffing</h3>
                        <p>Finding the right people is crucial for any organization's growth. Our team of experienced recruiters specializes in identifying and attracting top-notch professionals across various industries. We meticulously screen candidates, ensuring they possess the skills, qualifications, and cultural fit that align with your unique requirements.</p>
                    </div>
                </div>

                <div className="service-item reverse">
                    <div className="service-content">
                        <h3>Recruiters on Call</h3>
                        <p>"Recruiters on Call" is a specialized and tailored service offered by Risosu, providing organizations with the flexibility to engage experienced recruiters as and when required. This unique feature allows you to scale your recruitment efforts efficiently without long-term commitments.</p>
                    </div>
                </div>

                <div className="service-item">
                    <div className="service-content">
                        <h3>Resource Solution</h3>
                        <p>An exclusive feature of Risosu, this specialized service is designed for startups' HR needs. The service streamlines HR processes, offers expert guidance, and provides access to HR software with the aim of empowering startups to build a strong workforce, remain cost-effective, and focus on their core business goals without the need for a separate HR department.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
