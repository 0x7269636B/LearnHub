import React, { useEffect, useState } from 'react';
import './ManagementPortal.css';
import axios from "axios";

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

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await axios.post('http://localhost:8080/api/users', formData);
            setMessage('Ο χρήστης δημιουργήθηκε επιτυχώς!');
            setIsError(false); // Επιτυχία = Πράσινο

            // Καθαρισμός φόρμας
            setFormData({
                firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'STUDENT'
            });
        } catch (error) {
            setMessage('Σφάλμα: ' + (error.response?.data || 'Αποτυχία δημιουργίας.'));
            setIsError(true);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'STUDENT' // Default
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

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
                        Επισκόπηση
                    </li>
                    <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
                        Μαθητές
                    </li>
                    <li className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')}>
                        Καθηγητές
                    </li>
                    <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
                        Μαθήματα
                    </li>
                    <li className={activeTab === 'addUser' ? 'active' : ''} onClick={() => setActiveTab('addUser')}>
                        Νέος Χρήστης
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

                {activeTab === 'addUser' && (
                    <div className="card-container registration-form fade-in">
                        <h3 className="section-title">Δημιουργία Νέου Χρήστη</h3>

                        {message && (
                            <div style={{
                                padding: '12px 16px',
                                marginBottom: '24px',
                                borderRadius: '8px',
                                fontWeight: '500',
                                backgroundColor: isError ? '#fee2e2' : '#dcfce7',
                                color: isError ? '#ef4444' : '#15803d',
                                border: `1px solid ${isError ? '#fca5a5' : '#86efac'}`
                            }}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleCreateUser}>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Όνομα</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Επίθετο</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Κωδικός Πρόσβασης</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label>Τηλέφωνο</label>
                                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                                </div>
                                <div className="input-group">
                                    <label>Ρόλος Χρήστη</label>
                                    <select name="role" value={formData.role} onChange={handleInputChange} required>
                                        <option value="STUDENT">Μαθητής (Student)</option>
                                        <option value="TEACHER">Καθηγητής (Teacher)</option>
                                        <option value="ADMIN">Διαχειριστής (Admin)</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="save-btn">Δημιουργία Χρήστη</button>
                        </form>
                    </div>
                )}

            </main>
        </div>
    );
};

export default ManagementPortal;