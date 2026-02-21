import React, { useEffect, useState } from 'react';
import './AcademicPortal.css';
import axios from 'axios';

const AcademicPortal = () => {
    const [teacherName, setTeacherName] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [editedGrades, setEditedGrades] = useState({});

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

    const getEnrollmentsForCourse = (courseId) => {
        return enrollments.filter(enr => enr.course.cid === courseId);
    };

    const handleUpdateAbsence = async (enrollmentId, hours) => {
        try {
            await axios.put(`http://localhost:8080/api/admin/enrollments/${enrollmentId}/absences?hours=${hours}`);
            fetchTeacherData();
        } catch (error) {
            console.error("Σφάλμα κατά την ενημέρωση απουσίας:", error);
            alert("Υπήρξε πρόβλημα στην ενημέρωση της απουσίας.");
        }
    };

    const handleGradeChange = (enrollmentId, value) => {
        setEditedGrades({ ...editedGrades, [enrollmentId]: value });
    };

    const handleSaveGrade = async (enrollmentId) => {
        const gradeValue = editedGrades[enrollmentId];

        if (gradeValue === undefined || gradeValue === '') return;

        try {
            await axios.put(`http://localhost:8080/api/admin/enrollments/${enrollmentId}/grade?grade=${gradeValue}`);
            fetchTeacherData();
            alert("Ο βαθμός αποθηκεύτηκε επιτυχώς!");
        } catch (error) {
            console.error("Σφάλμα κατά την καταχώρηση βαθμού:", error);
            alert("Υπήρξε πρόβλημα στην καταχώρηση βαθμού.");
        }
    };

    return (
        <div className="academic-container">
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
                            const courseEnrollments = getEnrollmentsForCourse(course.cid);

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
                                            Σύνολο: {courseEnrollments.length} μαθητές
                                        </span>
                                    </div>

                                    {courseEnrollments.length > 0 ? (
                                        <div className="table-container">
                                            <table className="academic-table">
                                                <thead>
                                                <tr>
                                                    <th>Ονοματεπώνυμο Μαθητή</th>
                                                    <th>Email</th>
                                                    <th style={{ textAlign: 'center' }}>Απουσίες</th>
                                                    <th style={{ textAlign: 'center' }}>Ενέργειες</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {courseEnrollments.map(enr => (
                                                    <tr key={enr.id}>
                                                        <td>
                                                            <div className="course-cell">
                                                                <b>{enr.student.firstName} {enr.student.lastName}</b>
                                                                <span>ID: #{enr.student.id}</span>
                                                            </div>
                                                        </td>
                                                        <td>{enr.student.email}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <span style={{
                                                                fontWeight: 'bold',
                                                                fontSize: '1.1rem',
                                                                color: (enr.absences || 0) > 0 ? '#ef4444' : '#10b981'
                                                            }}>
                                                                {enr.absences || 0}
                                                            </span>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                                <button
                                                                    onClick={() => handleUpdateAbsence(enr.id, -1)}
                                                                    disabled={(enr.absences || 0) === 0} // Το απενεργοποιούμε αν οι απουσίες είναι ήδη 0
                                                                    style={{
                                                                        padding: '6px 10px',
                                                                        background: '#f1f5f9',
                                                                        color: '#475569',
                                                                        border: '1px solid #cbd5e1',
                                                                        borderRadius: '6px',
                                                                        fontWeight: '600',
                                                                        cursor: (enr.absences || 0) === 0 ? 'not-allowed' : 'pointer',
                                                                        opacity: (enr.absences || 0) === 0 ? 0.5 : 1, // Φαίνεται "σβηστό" αν είναι απενεργοποιημένο
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                >
                                                                    -1
                                                                </button>
                                                                <button
                                                                    onClick={() => handleUpdateAbsence(enr.id, 1)}
                                                                    style={{
                                                                        padding: '6px 10px',
                                                                        background: '#fee2e2',
                                                                        color: '#ef4444',
                                                                        border: '1px solid #fca5a5',
                                                                        borderRadius: '6px',
                                                                        cursor: 'pointer',
                                                                        fontWeight: '600',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                >
                                                                    +1
                                                                </button>
                                                            </div>
                                                        </td>
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
                    <div className="fade-in">
                        <div className="content-header" style={{ marginBottom: '24px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Βαθμολογίες Μαθητών (Ανά Μάθημα)</h3>
                        </div>

                        {courses.map(course => {
                            const courseEnrollments = getEnrollmentsForCourse(course.cid);

                            return (
                                <div key={course.cid} className="card-container" style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                        <h3 style={{ margin: 0, color: '#4f46e5', fontSize: '1.2rem' }}>
                                            📝 {course.title}
                                        </h3>
                                        <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }}>
                            {course.category}
                        </span>
                                    </div>

                                    {courseEnrollments.length > 0 ? (
                                        <div className="table-container">
                                            <table className="academic-table">
                                                <thead>
                                                <tr>
                                                    <th>Ονοματεπώνυμο Μαθητή</th>
                                                    <th style={{ textAlign: 'center' }}>Τρέχων Βαθμός</th>
                                                    <th style={{ textAlign: 'center', width: '200px' }}>Νέα Βαθμολογία</th>
                                                    <th style={{ textAlign: 'center' }}>Ενέργεια</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {courseEnrollments.map(enr => (
                                                    <tr key={enr.id}>
                                                        <td>
                                                            <div className="course-cell">
                                                                <b>{enr.student.firstName} {enr.student.lastName}</b>
                                                                <span>ID: #{enr.student.id}</span>
                                                            </div>
                                                        </td>

                                                        <td style={{ textAlign: 'center' }}>
                                                <span style={{
                                                    fontWeight: 'bold', fontSize: '1.1rem',
                                                    color: enr.grade ? '#10b981' : '#94a3b8'
                                                }}>
                                                    {enr.grade !== null ? enr.grade : '-'}
                                                </span>
                                                        </td>

                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                type="number"
                                                                min="0" max="20" step="0.5"
                                                                value={editedGrades[enr.id] !== undefined ? editedGrades[enr.id] : (enr.grade || '')}
                                                                onChange={(e) => handleGradeChange(enr.id, e.target.value)}
                                                                style={{
                                                                    width: '80px', padding: '6px', borderRadius: '4px',
                                                                    border: '1px solid #cbd5e1', textAlign: 'center'
                                                                }}
                                                                placeholder="π.χ. 18.5"
                                                            />
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <button
                                                                onClick={() => handleSaveGrade(enr.id)}
                                                                style={{
                                                                    padding: '6px 16px', background: '#4f46e5', color: '#fff',
                                                                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                                                                    fontWeight: '600', transition: 'background 0.2s'
                                                                }}
                                                                onMouseOver={(e) => e.target.style.background = '#4338ca'}
                                                                onMouseOut={(e) => e.target.style.background = '#4f46e5'}
                                                            >
                                                                Αποθήκευση
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', color: '#64748b' }}>
                                            Δεν υπάρχουν μαθητές για βαθμολόγηση σε αυτό το τμήμα.
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AcademicPortal;