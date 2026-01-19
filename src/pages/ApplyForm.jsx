import React, { useState } from 'react';
import './ApplyForm.css';
import { supabase } from '../supabaseClient';

const ApplyForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fullName, setFullName] = useState('');
    const [positions, setPositions] = useState([]);
    const [loadingPositions, setLoadingPositions] = useState(true);

    // Fetch positions on load
    React.useEffect(() => {
        const fetchPositions = async () => {
            const { data, error } = await supabase
                .from('positions')
                .select('*')
                .eq('is_active', true)
                .order('title');

            if (data) setPositions(data);
            setLoadingPositions(false);
        };
        fetchPositions();
    }, []);

    const handleSubmit = async (e) => {
        // ... (rest of submit logic stays same)
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const name = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const position = formData.get('position');
        const resumeFile = formData.get('attachment');

        setFullName(name);

        try {
            // 1. Upload Resume to Supabase Storage
            const fileExt = resumeFile.name.split('.').pop();
            const fileName = `${Date.now()}_${name.replace(/\s+/g, '_')}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, resumeFile);

            if (uploadError) {
                throw new Error('Resume upload failed: ' + uploadError.message);
            }

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('resumes')
                .getPublicUrl(fileName);

            const resumeUrl = publicUrlData.publicUrl;

            // 2. Insert Application into Database
            const { error: insertError } = await supabase
                .from('applications')
                .insert([
                    {
                        full_name: name,
                        email: email,
                        phone: phone,
                        position: position,
                        resume_url: resumeUrl
                    }
                ]);

            if (insertError) {
                throw new Error('Database insertion failed: ' + insertError.message);
            }

            setSubmitted(true);
            e.target.reset();

        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Application failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="container section text-center">
                <h2>Thank You, {fullName}!</h2>
                <p>Your application has been received successfully.</p>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
                    Your details and resume have been securely stored in our database.
                </p>
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
                            required
                        >
                            <option value="">Select a position...</option>
                            {!loadingPositions && positions.map(pos => (
                                <option key={pos.id} value={pos.title}>{pos.title}</option>
                            ))}
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
                        {isSubmitting ? 'Uploading...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyForm;
