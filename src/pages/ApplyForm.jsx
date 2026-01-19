import React, { useState } from 'react';
import './ApplyForm.css';

const ApplyForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        formData.append('access_key', 'e0dfcfa1-29a5-4631-ba60-e3f1ef49f04c');

        // Add custom subject line
        const position = formData.get('position');
        const fullName = formData.get('fullName');
        formData.append('subject', `Job Application: ${position} - ${fullName}`);

        // Redirect to hr@risosu.com
        formData.append('redirect', 'https://risosu.com/contact-us');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                e.target.reset();
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="container section text-center">
                <h2>Thank You!</h2>
                <p>Your application has been submitted successfully. We will review your resume and be in touch shortly.</p>
                <button className="btn" onClick={() => setSubmitted(false)}>Submit Another Application</button>
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position Applying For</label>
                        <select
                            id="position"
                            name="position"
                            defaultValue="Mobile Application Developer"
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
                            name="attachment"
                            accept=".pdf,.doc,.docx"
                            required
                        />
                    </div>

                    <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyForm;
