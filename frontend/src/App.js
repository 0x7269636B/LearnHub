import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ManagementPortal from './components/ManagementPortal';
import AcademicPortal from './components/AcademicPortal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['STUDENT']}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/management"
                    element={
                        <ProtectedRoute allowedRoles={['ADMIN']}>
                            <ManagementPortal />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/academic"
                    element={
                        <ProtectedRoute allowedRoles={['TEACHER']}>
                            <AcademicPortal />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </Router>
    );
}

export default App;