import React, { useEffect, useState } from 'react';
import './ManagementPortal.css';
import axios from "axios";

const ManagementPortal = () => {
    const [adminName, setAdminName] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });
    const [recentUsers, setRecentUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'STUDENT'
    });

    const [courseFormData, setCourseFormData] = useState({
        cid: null,
        title: '',
        description: '',
        category: 'Πληροφορική',
        hoursPerWeek: 2
    });

    useEffect(() => {
        const name = localStorage.getItem('firstName') || 'Admin';
        setAdminName(name);
    }, []);

    useEffect(() => {
        if (activeTab === 'dashboard') fetchDashboardData();
        else if (activeTab === 'students') fetchStudents();
        else if (activeTab === 'teachers') fetchTeachers();
        else if (activeTab === 'courses') fetchCourses();
    }, [activeTab]);

    const fetchDashboardData = async () => {
        try {
            const statsRes = await axios.get('http://localhost:8080/api/admin/stats');
            setStats(statsRes.data);

            const usersRes = await axios.get('http://localhost:8080/api/admin/recent-users');
            setRecentUsers(usersRes.data);
        } catch (error) {
            console.error("Σφάλμα", error);
        }
    };

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/students');
            setStudents(res.data);
        } catch (err) {
            console.error("Σφάλμα", err);
        }
    };

    const fetchTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/teachers');
            setTeachers(res.data);
        } catch (err) {
            console.error("Σφάλμα", err);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/courses');
            setCourses(res.data);
        } catch (err) {
            console.error("Σφάλμα", err);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCourseInputChange = (e) => {
        setCourseFormData({ ...courseFormData, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            await axios.post('http://localhost:8080/api/users', formData);
            setMessage('Ο χρήστης δημιουργήθηκε επιτυχώς!');
            setIsError(false);
            setFormData({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'STUDENT' });
        } catch (error) {
            setMessage('Σφάλμα: ' + (error.response?.data || 'Αποτυχία δημιουργίας.'));
            setIsError(true);
        }
    };

    const handleEditCourseClick = (course) => {
        setCourseFormData({
            cid: course.cid,
            title: course.title,
            description: course.description,
            category: course.category || 'Πληροφορική',
            hoursPerWeek: course.hoursPerWeek
        });
        setMessage('');
        setIsError(false);
        setActiveTab('addCourse');
    };

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            if (courseFormData.cid) {
                await axios.put(`http://localhost:8080/api/admin/courses/${courseFormData.cid}`, courseFormData);
                setMessage('Το μάθημα ενημερώθηκε επιτυχώς!');
            } else {
                await axios.post('http://localhost:8080/api/admin/courses', courseFormData);
                setMessage('Το μάθημα δημιουργήθηκε επιτυχώς!');
            }
            setIsError(false);
            setCourseFormData({ cid: null, title: '', description: '', category: 'Πληροφορική', hoursPerWeek: 2 });
            fetchCourses();
        } catch (error) {
            setMessage('Σφάλμα: ' + (error.response?.data || 'Αποτυχία αποθήκευσης μαθήματος.'));
            setIsError(true);
        }
    };

    return (
        <div className="management-container">
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

            <main className="content fade-in">
                <div className="content-header">
                    <h1>Κέντρο Ελέγχου, {adminName}</h1>
                    <p>Διαχειρίσου το φροντιστήριο, τους χρήστες και τα μαθήματα.</p>
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Σύνολο Μαθητών</h3>
                                <div className="stat-value">{stats.students}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Σύνολο Καθηγητών</h3>
                                <div className="stat-value">{stats.teachers}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Ενεργά Μαθήματα</h3>
                                <div className="stat-value">{stats.courses}</div>
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
                                        <th>ID / Email</th>
                                        <th>Κατάσταση</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {recentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <b>{user.firstName} {user.lastName}</b>
                                                    <span>{user.email}</span>
                                                </div>
                                            </td>
                                            <td>
                                                    <span className={`badge ${user.role === 'STUDENT' ? 'role-student' : user.role === 'TEACHER' ? 'role-teacher' : 'admin-badge'}`}>
                                                        {user.role}
                                                    </span>
                                            </td>
                                            <td>Μέλος #{user.id}</td>
                                            <td><span className="status-badge active">Ενεργός</span></td>
                                        </tr>
                                    ))}
                                    {recentUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                                Δεν βρέθηκαν χρήστες.
                                            </td>
                                        </tr>
                                    )}
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

                {activeTab === 'students' && (
                    <div className="card-container fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Λίστα Μαθητών</h3>
                            <button className="save-btn" style={{ width: 'auto', marginTop: 0, padding: '10px 16px' }} onClick={() => setActiveTab('addUser')}>
                                + Νέος Μαθητής
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="management-table">
                                <thead>
                                <tr>
                                    <th>Ονοματεπώνυμο</th>
                                    <th>Email / Τηλέφωνο</th>
                                    <th>Ημερομηνία Εγγραφής</th>
                                    <th>Κατάσταση</th>
                                </tr>
                                </thead>
                                <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>
                                            <div className="user-cell">
                                                <b>{student.firstName} {student.lastName}</b>
                                                <span>ID: #{student.id}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-cell">
                                                <b>{student.email}</b>
                                                <span>{student.phoneNumber || 'Δεν υπάρχει τηλέφωνο'}</span>
                                            </div>
                                        </td>
                                        <td>{student.registrationDate || 'Πρόσφατα'}</td>
                                        <td><span className="status-badge active">Ενεργός</span></td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Δεν βρέθηκαν μαθητές.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'teachers' && (
                    <div className="card-container fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Λίστα Καθηγητών</h3>
                            <button className="save-btn" style={{ width: 'auto', marginTop: 0, padding: '10px 16px' }} onClick={() => setActiveTab('addUser')}>
                                + Νέος Καθηγητής
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="management-table">
                                <thead>
                                <tr>
                                    <th>Ονοματεπώνυμο</th>
                                    <th>Στοιχεία Επικοινωνίας</th>
                                    <th>Ρόλος</th>
                                    <th>Κατάσταση</th>
                                </tr>
                                </thead>
                                <tbody>
                                {teachers.map(teacher => (
                                    <tr key={teacher.id}>
                                        <td>
                                            <div className="user-cell">
                                                <b>{teacher.firstName} {teacher.lastName}</b>
                                                <span>ID: #{teacher.id}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-cell">
                                                <b>{teacher.email}</b>
                                                <span>{teacher.phoneNumber || '-'}</span>
                                            </div>
                                        </td>
                                        <td><span className="badge role-teacher">Teacher</span></td>
                                        <td><span className="status-badge active">Ενεργός</span></td>
                                    </tr>
                                ))}
                                {teachers.length === 0 && (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Δεν βρέθηκαν καθηγητές.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div className="card-container fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>Κατάλογος Μαθημάτων</h3>
                            <button className="save-btn" style={{ width: 'auto', marginTop: 0, padding: '10px 16px', background: '#f8fafc' }}
                                    onClick={() => {
                                        setCourseFormData({ cid: null, title: '', description: '', category: 'Πληροφορική', hoursPerWeek: 2 });
                                        setMessage('');
                                        setActiveTab('addCourse');
                                    }}
                            >
                                + Νέο Μάθημα
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="management-table">
                                <thead>
                                <tr>
                                    <th>Τίτλος Μαθήματος</th>
                                    <th>Κατηγορία</th>
                                    <th>Ώρες / Εβδομάδα</th>
                                    <th>Ενέργειες</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map(course => (
                                    <tr key={course.cid}>
                                        <td>
                                            <div className="user-cell">
                                                <b>{course.title}</b>
                                                <span style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {course.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', textTransform: 'none', letterSpacing: 'normal' }}>
                                                {course.category || 'Πληροφορική'}
                                            </span>
                                        </td>
                                        <td><b>{course.hoursPerWeek}</b> ώρες</td>
                                        <td>
                                            <button
                                                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600' }}
                                                onClick={() => handleEditCourseClick(course)}
                                            >
                                                Επεξεργασία
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {courses.length === 0 && (
                                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Δεν βρέθηκαν μαθήματα.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'addCourse' && (
                    <div className="card-container registration-form fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="section-title" style={{ margin: 0 }}>
                                {courseFormData.cid ? 'Επεξεργασία Μαθήματος' : 'Δημιουργία Νέου Μαθήματος'}
                            </h3>
                            <button
                                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600' }}
                                onClick={() => setActiveTab('courses')}
                            >
                                ← Επιστροφή στα Μαθήματα
                            </button>
                        </div>

                        {message && (
                            <div style={{
                                padding: '12px 16px', marginBottom: '24px', borderRadius: '8px', fontWeight: '500',
                                backgroundColor: isError ? '#fee2e2' : '#dcfce7',
                                color: isError ? '#ef4444' : '#15803d',
                                border: `1px solid ${isError ? '#fca5a5' : '#86efac'}`
                            }}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSaveCourse}>
                            <div className="input-group">
                                <label>Τίτλος Μαθήματος</label>
                                <input type="text" name="title" value={courseFormData.title} onChange={handleCourseInputChange} placeholder="π.χ. Προγραμματισμός Java" required />
                            </div>

                            <div className="input-group">
                                <label>Περιγραφή</label>
                                <input type="text" name="description" value={courseFormData.description} onChange={handleCourseInputChange} placeholder="Σύντομη περιγραφή της ύλης..." required />
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label>Κατηγορία</label>
                                    <select name="category" value={courseFormData.category} onChange={handleCourseInputChange} required>
                                        <option value="Πληροφορική">Πληροφορική</option>
                                        <option value="Θετικές Επιστήμες">Θετικές Επιστήμες</option>
                                        <option value="Θεωρητικές Επιστήμες">Θεωρητικές Επιστήμες</option>
                                        <option value="Ξένες Γλώσσες">Ξένες Γλώσσες</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Ώρες ανά Εβδομάδα</label>
                                    <input type="number" name="hoursPerWeek" value={courseFormData.hoursPerWeek} onChange={handleCourseInputChange} min="1" max="20" required />
                                </div>
                            </div>

                            <button type="submit" className="save-btn">
                                {courseFormData.cid ? 'Ενημέρωση Μαθήματος' : 'Αποθήκευση Μαθήματος'}
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManagementPortal;