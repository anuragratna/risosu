import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Contact.css'; // Reusing styles for consistency

const Careers = () => {
    const [positions, setPositions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [expandedPositions, setExpandedPositions] = React.useState([]);

    const toggleExpand = (id) => {
        setExpandedPositions(prev =>
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

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
                <h1>Open Positions</h1>
                <h4>Join Our Team</h4>
                <p>We are always looking for talented individuals to join our growing team. Explore our current openings below.</p>
            </div>

            <div className="contact-grid" style={{ display: 'block', maxWidth: '800px', margin: '0 auto' }}>
                <div className="hiring-section" style={{ width: '100%' }}>
                    <h3>We're Hiring!</h3>
                    <p>If you're interested in one of our open positions, start by applying here and attaching your resume.</p>

                    {loading ? (
                        <p>Loading open positions...</p>
                    ) : positions.length > 0 ? (
                        <ul style={{ margin: '2rem 0', display: 'grid', gap: '1rem' }}>
                            {positions.map(pos => {
                                const isExpanded = expandedPositions.includes(pos.id);
                                return (
                                    <li key={pos.id} onClick={() => toggleExpand(pos.id)} style={{
                                        background: '#f8fafc',
                                        padding: '1.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        listStyle: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <h4 style={{ margin: 0, color: '#1e293b' }}>{pos.title}</h4>
                                            <span style={{
                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s',
                                                fontSize: '1.2rem',
                                                color: '#94a3b8'
                                            }}>↓</span>
                                        </div>

                                        {isExpanded && (
                                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', animation: 'fadeIn 0.3s' }}>
                                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                                                    {pos.description || "Join our dynamic team and help shape the future of Risosu Consulting."}
                                                </p>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No current openings, but we are always looking for talent!</p>
                    )}

                    <div style={{ marginTop: '2rem' }}>
                        <Link to="/apply" className="btn apply-btn">Apply Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
