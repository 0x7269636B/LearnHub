import React, { useEffect, useState } from 'react';
import './AcademicPortal.css';
import axios from 'axios';

const AcademicPortal = () => {
    const [teacherName, setTeacherName] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {

        const name = localStorage.getItem('firstName') || 'Καθηγητή';
        setTeacherName(name);

        fetchTeacherData();
    }, []);

    const fetchTeacherData = async () => {
        try {
            const coursesRes = await axios.get('http://localhost:8080/api/admin/courses');
            const enrollmentsRes = await axios.get('http://localhost:8080/api/admin/enrollments');

            setCourses(coursesRes.data);
            setEnrollments(enrollmentsRes.data);
        } catch (error) {
            console.error("Σφάλμα φόρτωσης δεδομένων καθηγητή:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const getStudentsForCourse = (courseId) => {
        return enrollments
            .filter(enr => enr.course.cid === courseId)
            .map(enr => enr.student);
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
                        Το Ταμπλό μου
                    </li>
                    <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>
                        Τα Μαθήματά μου
                    </li>
                    <li className={activeTab === 'students' ? 'active' : ''} onClick={() => setActiveTab('students')}>
                        Μαθητές & Βαθμοί
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
                    <h1>Καλωσήρθες, {teacherName} 👋</h1>
                    <p>Διαχειρίσου τα μαθήματά σου και την πρόοδο των μαθητών σου.</p>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Ενεργά Μαθήματα</h3>
                                <div className="stat-value">{courses.length || 3}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Σύνολο Μαθητών</h3>
                                <div className="stat-value">{new Set(enrollments.map(e => e.student.id)).size || 42}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Εκκρεμείς Βαθμολογίες</h3>
                                <div className="stat-value highlight">5</div>
                            </div>
                        </div>

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

                {activeTab === 'courses' && (
                    <div className="fade-in">
                        <div className="content-header" style={{ marginBottom: '24px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Οι Μαθητές μου ανά Μάθημα</h3>
                        </div>

                        {courses.map(course => {
                            const enrolledStudents = getStudentsForCourse(course.cid);

                            return (
                                <div key={course.cid} className="card-container" style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                        <h3 style={{ margin: 0, color: '#4f46e5', fontSize: '1.2rem' }}>
                                            📘 {course.title}
                                        </h3>
                                        <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }}>
                                            {course.category}
                                        </span>
                                        <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: '#64748b' }}>
                                            Σύνολο: {enrolledStudents.length} μαθητές
                                        </span>
                                    </div>

                                    {enrolledStudents.length > 0 ? (
                                        <div className="table-container">
                                            <table className="academic-table">
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Ονοματεπώνυμο Μαθητή</th>
                                                    <th>Email</th>
                                                    <th>Τηλέφωνο</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {enrolledStudents.map(student => (
                                                    <tr key={student.id}>
                                                        <td style={{ color: '#64748b', fontWeight: '600' }}>#{student.id}</td>
                                                        <td>
                                                            <div className="course-cell">
                                                                <b>{student.firstName} {student.lastName}</b>
                                                            </div>
                                                        </td>
                                                        <td>{student.email}</td>
                                                        <td>{student.phoneNumber || '-'}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', color: '#64748b' }}>
                                            Δεν υπάρχουν ακόμα εγγεγραμμένοι μαθητές σε αυτό το τμήμα.
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {courses.length === 0 && (
                            <div className="card-container" style={{ textAlign: 'center', padding: '40px' }}>
                                <p>Δεν βρέθηκαν μαθήματα στο σύστημα.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="card-container placeholder-content fade-in">
                        <h3>Ενότητα υπό κατασκευή</h3>
                        <p>Εδώ θα συνδέσουμε τη δυνατότητα βαθμολόγησης (US8) σύντομα!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AcademicPortal;