import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagementPortal.css';

const ManagementPortal = () => {
    const [activeTab, setActiveTab] = useState('register');
    const [students, setStudents] = useState([]);

    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        registrationDate: new Date().toISOString().split('T')[0]
    });

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/students');
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
        }
    };

    useEffect(() => {
        if (activeTab === 'list') {
            fetchStudents();
        }
    }, [activeTab]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/students', student);
            if (response.status === 200 || response.status === 201) {
                alert('Student ' + student.firstName + ' was saved to Database!');
                setStudent({
                    firstName: '', lastName: '', email: '', phoneNumber: '',
                    dateOfBirth: '', registrationDate: new Date().toISOString().split('T')[0]
                });
            }
        } catch (err) {
            console.error("Failed to save student:", err);
            alert('Error connecting to Backend.');
        }
    };

    return (
        <div className="portal-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Management</h2>
                    <span className="badge">Admin</span>
                </div>
                <nav>
                    <ul>
                        <li className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>
                            <i className="icon-user-plus"></i> Register Student (US3)
                        </li>
                        <li className={activeTab === 'assignment' ? 'active' : ''} onClick={() => setActiveTab('assignment')}>
                            <i className="icon-users"></i> Class Assignment (US4)
                        </li>
                        <li className={activeTab === 'tuition' ? 'active' : ''} onClick={() => setActiveTab('tuition')}>
                            <i className="icon-credit-card"></i> Tuition Tracking (US5)
                        </li>
                        {/* Η λίστα μπήκε τελευταία όπως ζήτησες */}
                        <li className={activeTab === 'list' ? 'active' : ''} onClick={() => setActiveTab('list')}>
                            <i className="icon-list"></i> Student List (US6)
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                {activeTab === 'register' && (
                    <div className="fade-in">
                        <header className="content-header">
                            <h1>New Student Enrollment</h1>
                            <p>Fill in the details to add a new student to the platform.</p>
                        </header>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input name="firstName" value={student.firstName} onChange={handleChange} placeholder="John" required />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input name="lastName" value={student.lastName} onChange={handleChange} placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="john.doe@example.com" required />
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input name="phoneNumber" value={student.phoneNumber} onChange={handleChange} placeholder="+30 690 000 0000" required />
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dateOfBirth" value={student.dateOfBirth} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Registration Date</label>
                                    <input type="date" name="registrationDate" value={student.registrationDate} onChange={handleChange} required />
                                </div>
                            </div>
                            <button type="submit" className="save-btn">Register Student</button>
                        </form>
                    </div>
                )}

                {activeTab === 'list' && (
                    <div className="fade-in">
                        <header className="content-header">
                            <h1>Student Database</h1>
                            <p>Manage and view all registered students.</p>
                        </header>
                        <div className="table-container">
                            <table className="student-table">
                                <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Contact Email</th>
                                    <th>Phone</th>
                                    <th>Reg. Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {students.length > 0 ? (
                                    students.map(s => (
                                        <tr key={s.id}>
                                            <td className="name-cell"><b>{s.firstName} {s.lastName}</b></td>
                                            <td>{s.email}</td>
                                            <td>{s.phoneNumber}</td>
                                            <td><span className="date-badge">{s.registrationDate}</span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>No students found.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {(activeTab === 'assignment' || activeTab === 'tuition') && (
                    <div className="placeholder-content">
                        <h1>{activeTab === 'assignment' ? 'Class Assignment' : 'Tuition Tracking'}</h1>
                        <p>Module integration in progress...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManagementPortal;