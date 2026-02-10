import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ManagementPortal from './components/ManagementPortal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/management" element={<ManagementPortal />} />
                {/*<Route path="/academic" element={<AcademicPortal />} />*/}
                {/*<Route path="/parent" element={<ParentPortal />} />*/}
            </Routes>
        </Router>
    );
}

export default App;