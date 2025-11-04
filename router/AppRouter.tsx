
import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboard from '../pages/StudentDashboard';

const AppRouter: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <LoginPage />;
    }

    if (user.role === 'admin') {
        return <AdminDashboard />;
    }
    
    if (user.role === 'student') {
        return <StudentDashboard />;
    }

    return <HomePage />;
};

export default AppRouter;
