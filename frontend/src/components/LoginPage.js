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
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                username: user,
                password: pass
            });

            const userData = res.data;
            localStorage.setItem('username', userData.username);

            // 1. Ρόλος TEACHER (Suffix check)
            if (user.endsWith('_learnhub')) {
                localStorage.setItem('role', 'TEACHER');
                window.location.href = '/academic';
            }
            // 2. Ρόλος ADMIN (Ακριβές όνομα)
            else if (user === 'admin') {
                localStorage.setItem('role', 'ADMIN');
                window.location.href = '/management';
            }
            // 3. Ρόλος STUDENT (Όλα τα άλλα)
            else {
                localStorage.setItem('role', 'STUDENT');
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError('Invalid credentials. Remember: Staff use _learnhub suffix.');
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
                        <label>Username</label>
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