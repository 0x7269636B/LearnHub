import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Κλήση στο API που φτιάξαμε στο Spring Boot
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });

            const user = response.data;

            // Αποθήκευση του ρόλου για το RBAC (Role-Based Access Control)
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('username', user.username);

            // Ανακατεύθυνση ανάλογα με τον ρόλο (Απαίτηση 9 της εκφώνησης)
            if (user.role === 'ADMIN' || user.role === 'SECRETARY') {
                navigate('/admin-dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Λάθος όνομα χρήστη ή κωδικός πρόσβασης');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>LearnHub Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Είσοδος
                </button>
            </form>
        </div>
    );
};

export default LoginPage;