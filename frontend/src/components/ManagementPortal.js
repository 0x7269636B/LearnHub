import React, { useState } from 'react';
import axios from 'axios';
import './ManagementPortal.css';

const ManagementPortal = () => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '', // Προσθήκη
        registrationDate: new Date().toISOString().split('T')[0] // Default η σημερινή ημερομηνία
    });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Η κλήση που αποθηκεύει τον μαθητή στη DB
            const response = await axios.post('http://localhost:8080/api/students', student);

            if (response.status === 200 || response.status === 201) {
                alert('Student ' + student.firstName + ' was saved to Database!');
                // Καθαρισμός φόρμας
                setStudent({ firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '', registrationDate: ''});
            }
        } catch (err) {
            console.error("Failed to save student:", err);
            alert('Error connecting to Backend. Is Spring Boot running?');
        }
    };

    return (
        <div className="portal-container">
            <aside className="sidebar">
                <h2>Management Portal</h2>
                <nav>
                    <ul>
                        <li className="active">Register Student (US3)</li>
                        <li>Class Assignment (US4)</li>
                        <li>Tuition Tracking (US5)</li>
                    </ul>
                </nav>
            </aside>

            <main className="content">
                <header>
                    <h1>Student Registration</h1>
                    <p>Register a new student to the system </p>
                </header>

                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="input-row">
                        <div className="input-group">
                            <label>First Name</label>
                            <input name="firstName" value={student.firstName} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input name="lastName" value={student.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={student.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input name="phoneNumber" value={student.phoneNumber} onChange={handleChange} required />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={student.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Registration Date</label>
                            <input
                                type="date"
                                name="registrationDate"
                                value={student.registrationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="save-btn">Register Student</button>
                </form>
            </main>
        </div>
    );
};

export default ManagementPortal;