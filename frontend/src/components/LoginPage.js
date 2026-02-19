import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Στέλνουμε το request στο Backend
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                username: user, // Αυτό είναι το email που πληκτρολόγησε ο χρήστης
                password: pass
            });

            // Το Spring Boot μας επιστρέφει τον χρήστη (π.χ. { id: 1, email: "...", role: "TEACHER" })
            const userData = res.data;

            // Αποθηκεύουμε τα σωστά δεδομένα στο localStorage
            localStorage.setItem('email', userData.email);
            localStorage.setItem('role', userData.role);
            // Μπορείς να αποθηκεύσεις και το όνομα για να το δείχνεις στο Navbar!
            localStorage.setItem('firstName', userData.firstName);

            // Ελέγχουμε τον ρόλο ΒΑΣΕΙ ΤΗΣ ΒΑΣΗΣ ΔΕΔΟΜΕΝΩΝ, όχι μαντεύοντας!
            if (userData.role === 'TEACHER') {
                window.location.href = '/academic';
            }
            else if (userData.role === 'ADMIN') {
                window.location.href = '/management';
            }
            else if (userData.role === 'STUDENT') {
                window.location.href = '/dashboard';
            }
            else {
                setError('Άγνωστος ρόλος χρήστη.');
            }

        } catch (err) {
            // Αν το Backend ρίξει Exception (π.χ. λάθος κωδικός), θα πιάσει το error εδώ
            setError('Invalid credentials. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-container">
            <div className="login-side-image">
                <div className="overlay">
                    <h1>LearnHub</h1>
                    <p>Connecting the Academic Community.</p>
                </div>
            </div>
            <div className="login-side-form">
                <form className="login-box" onSubmit={handleLogin}>
                    <h2>Welcome</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-group">
                        <label>Email</label>
                        <input type="text" value={user} onChange={e => setUser(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={pass} onChange={e => setPass(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Verifying...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;