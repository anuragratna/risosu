import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total_apps: 0, active_positions: 0 });
    const [newPosition, setNewPosition] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    const navigate = useNavigate();

    // Fetch initial data
    const fetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/admin/login');
            return;
        }

        // Fetch Applications
        const { data: appsData, error: appsError } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (!appsError) setApplications(appsData);

        // Fetch Positions
        const { data: posData, error: posError } = await supabase
            .from('positions')
            .select('*')
            .order('title');

        if (!posError) setPositions(posData);

        // Update stats
        if (!appsError && !posError) {
            setStats({
                total_apps: appsData.length,
                active_positions: posData.filter(p => p.is_active).length
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    // --- APPLICATION LOGIC ---
    const handleDeleteApplication = async (id, resumeUrl) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;

        try {
            // 1. Delete Resume from Storage (if exists)
            if (resumeUrl) {
                const fileName = resumeUrl.split('/').pop();
                if (fileName) {
                    await supabase.storage.from('resumes').remove([fileName]);
                }
            }

            // 2. Delete from DB
            const { error } = await supabase.from('applications').delete().eq('id', id);

            if (error) throw error;

            // Refresh list
            setApplications(applications.filter(app => app.id !== id));
            setStats(prev => ({ ...prev, total_apps: prev.total_apps - 1 }));

        } catch (error) {
            alert('Error deleting application: ' + error.message);
        }
    };

    // --- POSITION LOGIC ---
    const handleAddPosition = async (e) => {
        e.preventDefault();
        if (!newPosition.trim()) return;

        try {
            const { data, error } = await supabase
                .from('positions')
                .insert([{ title: newPosition.trim(), is_active: true }])
                .select();

            if (error) throw error;

            setPositions([...positions, data[0]]);
            setNewPosition('');
            setStats(prev => ({ ...prev, active_positions: prev.active_positions + 1 }));

        } catch (error) {
            alert('Error adding position: ' + error.message);
        }
    };

    const handleTogglePosition = async (id, currentStatus) => {
        try {
            await supabase.from('positions').update({ is_active: !currentStatus }).eq('id', id);
            setPositions(positions.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
            setStats(prev => ({ ...prev, active_positions: prev.active_positions + (currentStatus ? -1 : 1) }));
        } catch (error) {
            console.error('Error updating position:', error);
        }
    };

    const handleEditPosition = (id, title) => {
        setEditingId(id);
        setEditingTitle(title);
    };

    const handleSavePosition = async (id) => {
        try {
            await supabase.from('positions').update({ title: editingTitle }).eq('id', id);
            setPositions(positions.map(p => p.id === id ? { ...p, title: editingTitle } : p));
            setEditingId(null);
        } catch (error) {
            alert('Error saving position: ' + error.message);
        }
    };

    if (loading) return <div className="admin-container">Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h1><span>RISOSU</span> Admin Portal</h1>
                        <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Manage Job Applications & Positions</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Total Applications</div>
                        <div className="stat-value">{stats.total_apps}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Active Positions</div>
                        <div className="stat-value">{stats.active_positions}</div>
                    </div>
                </div>

                {/* --- POSITIONS MANAGEMENT --- */}
                <div className="section-card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--admin-primary)' }}>Manage Positions</h3>

                    {/* Add Position Form */}
                    <form onSubmit={handleAddPosition} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="New Position Title (e.g. HR Manager)"
                            value={newPosition}
                            onChange={(e) => setNewPosition(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', flex: 1 }}
                        />
                        <button type="submit" className="btn" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Add Position</button>
                    </form>

                    {/* Positions List */}
                    <div className="positions-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {positions.map(pos => (
                            <div key={pos.id} className="position-item" style={{
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                opacity: pos.is_active ? 1 : 0.6
                            }}>
                                {editingId === pos.id ? (
                                    <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                                        <input
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            style={{ padding: '0.25rem', flex: 1 }}
                                        />
                                        <button onClick={() => handleSavePosition(pos.id)} className="btn-sm">Save</button>
                                        <button onClick={() => setEditingId(null)} className="btn-sm" style={{ background: '#ccc' }}>Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <span style={{ fontWeight: 500 }}>{pos.title}</span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleEditPosition(pos.id, pos.title)}
                                                style={{ border: 'none', background: 'none', color: '#3b82f6', cursor: 'pointer' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleTogglePosition(pos.id, pos.is_active)}
                                                style={{
                                                    border: 'none',
                                                    background: pos.is_active ? '#dbeafe' : '#f1f5f9',
                                                    color: pos.is_active ? '#1e40af' : '#64748b',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                {pos.is_active ? 'Active' : 'Hidden'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- APPLICATIONS TABLE --- */}
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
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{app.full_name}</div>
                                            </td>
                                            <td>
                                                <span className="role-badge">{app.position}</span>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '0.9rem' }}>{app.email}</div>
                                            </td>
                                            <td style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                {app.resume_url ? (
                                                    <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="resume-btn">
                                                        View Resume
                                                    </a>
                                                ) : <span style={{ color: '#ccc' }}>No Resume</span>}

                                                <button
                                                    onClick={() => handleDeleteApplication(app.id, app.resume_url)}
                                                    className="logout-btn"
                                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                >
                                                    Delete
                                                </button>
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
