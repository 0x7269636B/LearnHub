import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';

// Ένα απλό component για το Dashboard (θα το επεκτείνουμε αργότερα)
const Dashboard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('userRole');

  return (
      <div style={{ padding: '20px' }}>
        <h1>Καλωσήρθες, {username}!</h1>
        <p>Ο ρόλος σου στο LearnHub είναι: <strong>{role}</strong></p>
        <button onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</button>
      </div>
  );
};

function App() {
  return (
      <Router>
        <Routes>
          {/* Η αρχική σελίδα είναι το Login */}
          <Route path="/" element={<LoginPage />} />

          {/* Σελίδα Dashboard - Προσβάσιμη μετά το login */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Redirect αν η σελίδα δεν υπάρχει */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

export default App;