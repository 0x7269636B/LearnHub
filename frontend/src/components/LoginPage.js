import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Βεβαιώσου ότι το αρχείο CSS είναι στον ίδιο φάκελο

const LoginPage = () => {
    // State για τη διαχείριση των πεδίων της φόρμας
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Καθαρισμός προηγούμενων λαθών

        try {
            // Κλήση στο Spring Boot API (Προσοχή στο URL και το Port)
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: username,
                password: password
            });

            // Αν η σύνδεση είναι επιτυχής, το Backend επιστρέφει το User αντικείμενο
            const user = response.data;

            // Αποθήκευση στοιχείων στο LocalStorage για να τα έχουμε στο Dashboard
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('username', user.username);
            localStorage.setItem('isLoggedIn', 'true');

            // Ανακατεύθυνση βάσει Ρόλου (Απαίτηση 9 της εκφώνησης)
            if (user.role === 'ADMIN' || user.role === 'SECRETARY') {
                navigate('/admin-dashboard');
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            // Διαχείριση σφαλμάτων (π.χ. 401 Unauthorized)
            if (err.response && err.response.status === 401) {
                setError('Λάθος όνομα χρήστη ή κωδικός πρόσβασης.');
            } else {
                setError('Πρόβλημα σύνδεσης με τον διακομιστή. Βεβαιωθείτε ότι το Backend τρέχει.');
            }
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>LearnHub</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
                    Είσοδος στην πλατφόρμα
                </p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Όνομα Χρήστη</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="π.χ. gpapadopoulos"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Κωδικός Πρόσβασης</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Σύνδεση
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
                    &copy; 2026 LearnHub Management System
                </div>
            </div>
        </div>
    );
};

export default LoginPage;