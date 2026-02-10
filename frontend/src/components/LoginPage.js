import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const role = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Στέλνουμε μόνο username/password
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                username: user,
                password: pass
            });

            console.log("Server Response:", res.data); // Για να βλέπεις τι role επιστρέφει

            localStorage.setItem('username', res.data.username);
            localStorage.setItem('role', res.data.role); // Αποθηκεύουμε τον ρόλο για μελλοντική χρήση

            // Παίρνουμε τον ρόλο από την ΑΠΑΝΤΗΣΗ του backend (res.data.role)
            const userRole = res.data.role;

            if (userRole === 'ADMIN') {
                window.location.href = '/management'; // US2, US3, US4, US5
            } else if (userRole === 'TEACHER') {
                window.location.href = '/academic';   // US6, US7, US8
            } else if (userRole === 'PARENT') {
                window.location.href = '/parent';     // US9, US10
            } else {
                // Αν ο ρόλος είναι STUDENT ή κάτι άλλο, στείλε τον στο default dashboard
                window.location.href = '/dashboard';
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Invalid username or password. Please try again.');
        }
    };
    return (
        <div className="login-container">
            <div className="login-side-image">
                <div className="overlay">
                    <h1>LearnHub</h1>
                    <p>Connecting Students, Parents, and Administration in one place.</p>
                </div>
            </div>

            <div className="login-side-form">
                <form className="login-box" onSubmit={handleLogin}>
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Please enter your details to sign in</p>

                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="e.g. j.doe"
                            onChange={e => setUser(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={e => setPass(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Sign In</button>

                    <div className="login-footer">
                        <p>Access for: <span>Students</span> • <span>Parents</span> • <span>Staff</span></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;