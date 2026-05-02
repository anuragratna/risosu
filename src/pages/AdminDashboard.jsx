import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Admin.css';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total_apps: 0, active_positions: 0 });
    const [newPosition, setNewPosition] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [expandedPositions, setExpandedPositions] = useState([]);
    const [filterPosition, setFilterPosition] = useState('All');

    const toggleExpand = (id) => {
        setExpandedPositions(prev =>
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

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
    const [newDescription, setNewDescription] = useState('');

    // ... (rest of logic)

    const handleDeletePosition = async (id) => {
        if (!window.confirm('Are you sure you want to delete this position?')) return;
        try {
            const { error } = await supabase.from('positions').delete().eq('id', id);
            if (error) throw error;
            setPositions(positions.filter(p => p.id !== id));
            setStats(prev => ({ ...prev, active_positions: prev.active_positions - 1 })); // Approximation
        } catch (error) {
            alert('Error deleting position: ' + error.message);
        }
    };

    const handleAddPosition = async (e) => {
        e.preventDefault();
        if (!newPosition.trim()) return;

        try {
            const { data, error } = await supabase
                .from('positions')
                .insert([{
                    title: newPosition.trim(),
                    description: newDescription.trim(),
                    is_active: true
                }])
                .select();

            if (error) throw error;

            setPositions([...positions, data[0]]);
            setNewPosition('');
            setNewDescription('');
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

    const filteredApplications = filterPosition === 'All' 
        ? applications 
        : applications.filter(app => app.position === filterPosition);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];
    
    const positionCounts = applications.reduce((acc, app) => {
        const pos = app.position || 'Unknown';
        acc[pos] = (acc[pos] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(positionCounts).map(pos => ({
        name: pos,
        value: positionCounts[pos]
    }));

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
                    <div className="stat-card" style={{ gridColumn: '1 / -1', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                        <div className="stat-label">Applications by Position</div>
                        {pieData.length > 0 ? (
                            <div style={{ flex: 1, minHeight: '350px', width: '100%', marginTop: '1rem', position: 'relative' }}>
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px', paddingBottom: '10px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="stat-value" style={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', color: '#ccc' }}>0 Applications</div>
                        )}
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 600, color: '#0f172a', fontSize: '1.2rem' }}>Total Applications: {stats.total_apps}</div>
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
                    <form onSubmit={handleAddPosition} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Position Title (e.g. HR Manager)"
                                value={newPosition}
                                onChange={(e) => setNewPosition(e.target.value)}
                                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', flex: 1 }}
                            />
                            <button type="submit" className="btn" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Add Position</button>
                        </div>
                        <textarea
                            placeholder="Position Description (Requirements, Responsibilities, etc.)"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', minHeight: '80px' }}
                        />
                    </form>

                    {/* Positions List */}
                    <div className="positions-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {positions.map(pos => {
                            const isExpanded = expandedPositions.includes(pos.id);
                            return (
                            <div key={pos.id} className="position-item" style={{
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                opacity: pos.is_active ? 1 : 0.7,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease'
                            }}>
                                {editingId === pos.id ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                        <input
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                        />
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleSavePosition(pos.id)} className="btn-sm">Save</button>
                                            <button onClick={() => setEditingId(null)} className="btn-sm" style={{ background: '#ccc' }}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div 
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                            onClick={() => toggleExpand(pos.id)}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{pos.title}</span>
                                                {!pos.is_active && <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#e2e8f0', color: '#64748b', borderRadius: '4px', fontWeight: 600 }}>Inactive</span>}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: '#64748b', display: 'inline-block' }}>
                                                    ▼
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {isExpanded && (
                                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                                <p style={{ fontSize: '0.95rem', color: '#475569', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{pos.description || 'No description available.'}</p>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                        <button
                                                            onClick={() => handleEditPosition(pos.id, pos.title)}
                                                            style={{ border: 'none', background: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleTogglePosition(pos.id, pos.is_active)}
                                                            style={{
                                                                border: 'none',
                                                                background: pos.is_active ? '#dbeafe' : '#e2e8f0',
                                                                color: pos.is_active ? '#1e40af' : '#64748b',
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {pos.is_active ? 'Set Inactive' : 'Set Active'}
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeletePosition(pos.id)}
                                                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
                                                        title="Delete Position"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )})}
                    </div>
                </div>

                {/* --- APPLICATIONS TABLE --- */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '3rem' }}>
                    <h3 style={{ color: 'var(--admin-primary)', margin: 0 }}>Applications</h3>
                    {applications.length > 0 && (
                        <select 
                            value={filterPosition} 
                            onChange={(e) => setFilterPosition(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd', minWidth: '200px' }}
                        >
                            <option value="All">All Positions</option>
                            {[...new Set(applications.map(app => app.position))].filter(Boolean).map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                    )}
                </div>

                {filteredApplications.length === 0 ? (
                    <div className="no-data">
                        <h3>No Applications Found</h3>
                        <p>{applications.length === 0 ? 'Waiting for candidates to apply...' : 'No candidates match the selected filter.'}</p>
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
                                    {filteredApplications.map((app) => (
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
