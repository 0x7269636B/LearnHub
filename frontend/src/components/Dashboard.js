import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [studentName, setStudentName] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const name = localStorage.getItem('firstName') || 'Μαθητή';
        setStudentName(name);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon student-logo">LH</div>
                    <div>
                        <h2>LearnHub</h2>
                        <span className="badge student-badge">Student</span>
                    </div>
                </div>

                <ul className="sidebar-menu">
                    <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        Το Ταμπλό μου
                    </li>
                    <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
                        Τα Μαθήματά μου
                    </li>
                    <li className={activeTab === 'grades' ? 'active' : ''} onClick={() => setActiveTab('grades')}>
                        Οι Βαθμοί μου
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn-sidebar">
                        Αποσύνδεση
                    </button>
                </div>
            </aside>

            <main className="content fade-in">
                <div className="content-header">
                    <h1>Γεια σου, {studentName}</h1>
                    <p>Παρακολούθησε την πρόοδό σου και το πρόγραμμά σου.</p>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Εγγεγραμμένα Μαθήματα</h3>
                                <div className="stat-value">4</div>
                            </div>
                            <div className="stat-card">
                                <h3>Μέσος Όρος (Τεστ)</h3>
                                <div className="stat-value">18.5</div>
                            </div>
                            <div className="stat-card">
                                <h3>Επερχόμενες Εργασίες</h3>
                                <div className="stat-value highlight">2</div>
                            </div>
                        </div>

                        <div className="card-container mt-40">
                            <h3 className="section-title">Το Πρόγραμμά μου (Σήμερα)</h3>
                            <div className="table-container">
                                <table className="student-table">
                                    <thead>
                                    <tr>
                                        <th>Μάθημα</th>
                                        <th>Καθηγητής</th>
                                        <th>Ώρα</th>
                                        <th>Αίθουσα</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="course-cell">
                                                <b>Ανάπτυξη Εφαρμογών (ΑΕΠΠ)</b>
                                                <span>Πληροφορική</span>
                                            </div>
                                        </td>
                                        <td>Κος. Αλεξίου</td>
                                        <td>17:00 - 19:00</td>
                                        <td>Εργαστήριο 2</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="course-cell">
                                                <b>Ιστορία Κατεύθυνσης</b>
                                                <span>Θεωρητική</span>
                                            </div>
                                        </td>
                                        <td>Κα. Γεωργίου</td>
                                        <td>19:00 - 20:30</td>
                                        <td>Αίθουσα 5</td>
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
                        <p>Τα δεδομένα θα φορτωθούν σύντομα.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;