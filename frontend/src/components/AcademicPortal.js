import React, { useEffect, useState } from 'react';
import './AcademicPortal.css';

const AcademicPortal = () => {
    const [teacherName, setTeacherName] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        // Παίρνουμε το όνομα (ή το email) από το localStorage
        const name = localStorage.getItem('firstName') || 'Καθηγητή';
        setTeacherName(name);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="academic-container">
            {/* Sidebar Καθηγητή */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">LH</div>
                    <div>
                        <h2>LearnHub</h2>
                        <span className="badge teacher-badge">Teacher</span>
                    </div>
                </div>

                <ul className="sidebar-menu">
                    <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        📚 Το Ταμπλό μου
                    </li>
                    <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
                        📖 Τα Μαθήματά μου
                    </li>
                    <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
                        🎓 Μαθητές & Βαθμοί
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
                    <h1>Καλωσήρθες, {teacherName} 👋</h1>
                    <p>Διαχειρίσου τα μαθήματά σου και την πρόοδο των μαθητών σου.</p>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        {/* Κάρτες Στατιστικών */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Ενεργά Μαθήματα</h3>
                                <div className="stat-value">3</div>
                            </div>
                            <div className="stat-card">
                                <h3>Σύνολο Μαθητών</h3>
                                <div className="stat-value">42</div>
                            </div>
                            <div className="stat-card">
                                <h3>Εκκρεμείς Βαθμολογίες</h3>
                                <div className="stat-value highlight">5</div>
                            </div>
                        </div>

                        {/* Πρόσφατη Δραστηριότητα (Πίνακας) */}
                        <div className="card-container mt-40">
                            <h3 className="section-title">Το Πρόγραμμά μου (Σήμερα)</h3>
                            <div className="table-container">
                                <table className="academic-table">
                                    <thead>
                                    <tr>
                                        <th>Μάθημα</th>
                                        <th>Ώρα</th>
                                        <th>Αίθουσα</th>
                                        <th>Κατάσταση</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="course-cell">
                                                <b>Advanced Mathematics</b>
                                                <span>Γ' Λυκείου</span>
                                            </div>
                                        </td>
                                        <td>16:00 - 18:00</td>
                                        <td>Αίθουσα 3</td>
                                        <td><span className="status-badge upcoming">Προσεχώς</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="course-cell">
                                                <b>Physics (Advanced)</b>
                                                <span>Β' Λυκείου</span>
                                            </div>
                                        </td>
                                        <td>18:30 - 20:00</td>
                                        <td>Εργαστήριο 1</td>
                                        <td><span className="status-badge upcoming">Προσεχώς</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab !== 'dashboard' && (
                    <div className="placeholder-content">
                        <h3>Ενότητα υπό κατασκευή</h3>
                        <p>Εδώ θα συνδέσουμε τα δεδομένα από το Spring Boot σύντομα!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AcademicPortal;