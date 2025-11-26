// File: src/components/ProtectedRoute.js

import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children }) => {
    const user = authService.getCurrentUser();

    if (!user) {
        // Jika tidak ada user, tendang ke halaman login
        return <Navigate to="/login" />;
    }

    // Jika ada user, tampilkan halaman yang diminta
    return children;
};

export default ProtectedRoute;