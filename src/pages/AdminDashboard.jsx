import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/admin/login');
                return;
            }

            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching applications:', error);
            } else {
                setApplications(data);
            }
            setLoading(false);
        };

        fetchApplications();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return <div className="admin-container">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h1><span>RISOSU</span> Admin Portal</h1>
                        <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Manage Job Applications</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Total Applications</div>
                        <div className="stat-value">{applications.length}</div>
                    </div>
                </div>

                {applications.length === 0 ? (
                    <div className="no-data">
                        <h3>No Applications Yet</h3>
                        <p>Waiting for candidates to apply...</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <div className="table-responsive">
                            <table className="applications-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Candidate</th>
                                        <th>Position</th>
                                        <th>Contact</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app.id}>
                                            <td style={{ color: '#64748b' }}>
                                                {new Date(app.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{app.full_name}</div>
                                            </td>
                                            <td>
                                                <span className="role-badge">{app.position}</span>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '0.9rem' }}>{app.email}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{app.phone}</div>
                                            </td>
                                            <td>
                                                {app.resume_url ? (
                                                    <a
                                                        href={app.resume_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resume-btn"
                                                    >
                                                        View Resume
                                                    </a>
                                                ) : (
                                                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No Resume</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
