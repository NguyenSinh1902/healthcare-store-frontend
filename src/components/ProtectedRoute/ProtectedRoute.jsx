import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute - Wrapper component to protect admin routes
 * Checks if user is authenticated and has ADMIN role
 * Redirects to /admin/login if not authenticated or not ADMIN
 */
const ProtectedRoute = ({ children }) => {
    const { user, token } = useSelector((state) => state.auth);

    // Check if user is authenticated and has ADMIN role
    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'admin';

    if (!isAuthenticated || !isAdmin) {
        // Redirect to admin login page
        return <Navigate to="/admin/login" replace />;
    }

    // User is authenticated and is ADMIN, render children
    return children;
};

export default ProtectedRoute;
