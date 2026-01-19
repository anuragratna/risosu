import React, { useState } from 'react';
import './ApplyForm.css';

const ApplyForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: 'Mobile Application Developer',
        resume: null
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct mailto link
        const subject = `Job Application: ${formData.position} - ${formData.fullName}`;
        const body = `Name: ${formData.fullName}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0A%0D%0ANote: Please attach your resume manually to this email.`;

        // Open default email client
        window.location.href = `mailto:hr@risosu.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="container section text-center">
                <h2>Thank You!</h2>
                <p>Your application has been received. We will be in touch shortly.</p>
                <button className="btn" onClick={() => setSubmitted(false)}>Submit Another</button>
            </div>
        );
    }

    return (
        <div className="apply-page container section">
            <div className="form-container">
                <h1>Job Application</h1>
                <p>Join the Risosu Consulting team.</p>

                <form onSubmit={handleSubmit} className="apply-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position Applying For</label>
                        <select
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                        >
                            <option value="Mobile Application Developer">Mobile Application Developer</option>
                            <option value="Sr Java Developer">Sr Java Developer</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="resume">Resume/CV (PDF or Doc)</label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn submit-btn">Submit Application</button>
                </form>
            </div>
        </div>
    );
};

export default ApplyForm;
