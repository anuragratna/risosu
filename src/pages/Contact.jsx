import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Contact.css';

const Contact = () => {
    const [positions, setPositions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPositions = async () => {
            try {
                const { data, error } = await supabase
                    .from('positions')
                    .select('*')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setPositions(data || []);
            } catch (error) {
                console.error('Error fetching positions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);

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

                    {loading ? (
                        <p>Loading open positions...</p>
                    ) : positions.length > 0 ? (
                        <ul>
                            {positions.map(pos => (
                                <li key={pos.id}>{pos.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No current openings, but we are always looking for talent!</p>
                    )}

                    <Link to="/apply" className="btn apply-btn">Apply Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
