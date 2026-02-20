import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = localStorage.getItem('role');

    if (!userRole) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        if (userRole === 'ADMIN') return <Navigate to="/management" replace />;
        if (userRole === 'TEACHER') return <Navigate to="/academic" replace />;
        if (userRole === 'STUDENT') return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;