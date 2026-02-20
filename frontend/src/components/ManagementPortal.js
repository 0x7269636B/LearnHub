import React, { useEffect, useState } from 'react';
import './ManagementPortal.css';

const ManagementPortal = () => {
    const [adminName, setAdminName] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const name = localStorage.getItem('firstName') || 'Admin';
        setAdminName(name);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="management-container">
            {/* Sidebar Admin */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon admin-logo">LH</div>
                    <div>
                        <h2>LearnHub</h2>
                        <span className="badge admin-badge">Administrator</span>
                    </div>
                </div>

                <ul className="sidebar-menu">
                    <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        📊 Επισκόπηση
                    </li>
                    <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
                        👩‍🎓 Μαθητές
                    </li>
                    <li className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')}>
                        👨‍🏫 Καθηγητές
                    </li>
                    <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
                        📚 Μαθήματα
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn-sidebar">
                        Αποσύνδεση
                    </button>
                </div>
            </aside>

            {/* Κεντρικό Περιεχόμενο */}
            <main className="content fade-in">
                <div className="content-header">
                    <h1>Κέντρο Ελέγχου, {adminName} ⚡</h1>
                    <p>Διαχειρίσου το φροντιστήριο, τους χρήστες και τα μαθήματα.</p>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        {/* Κάρτες Στατιστικών */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Σύνολο Μαθητών</h3>
                                <div className="stat-value">128</div>
                            </div>
                            <div className="stat-card">
                                <h3>Σύνολο Καθηγητών</h3>
                                <div className="stat-value">12</div>
                            </div>
                            <div className="stat-card">
                                <h3>Ενεργά Μαθήματα</h3>
                                <div className="stat-value">24</div>
                            </div>
                        </div>

                        {/* Πίνακας Τελευταίων Εγγραφών */}
                        <div className="card-container mt-40">
                            <h3 className="section-title">Πρόσφατες Εγγραφές</h3>
                            <div className="table-container">
                                <table className="management-table">
                                    <thead>
                                    <tr>
                                        <th>Ονοματεπώνυμο</th>
                                        <th>Ρόλος</th>
                                        <th>Ημερομηνία</th>
                                        <th>Κατάσταση</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="user-cell">
                                                <b>Γιώργος Παπαδόπουλος</b>
                                                <span>giorgos@test.com</span>
                                            </div>
                                        </td>
                                        <td><span className="badge role-student">Student</span></td>
                                        <td>20 Οκτ 2023</td>
                                        <td><span className="status-badge active">Ενεργός</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="user-cell">
                                                <b>Μαρία Νικολάου</b>
                                                <span>maria@test.com</span>
                                            </div>
                                        </td>
                                        <td><span className="badge role-teacher">Teacher</span></td>
                                        <td>18 Οκτ 2023</td>
                                        <td><span className="status-badge active">Ενεργή</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab !== 'dashboard' && (
                    <div className="placeholder-content">
                        <h3>Ενότητα "{activeTab}" υπό κατασκευή</h3>
                        <p>Εδώ θα εμφανιστούν οι φόρμες διαχείρισης (CRUD).</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManagementPortal;