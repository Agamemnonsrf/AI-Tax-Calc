import React from 'react';
import { Outlet } from 'react-router';
import { AuthProvider } from '../../context/AuthContext';
import Header from '../header/header';

const AuthLayout: React.FC = () => {
    return (
        <AuthProvider>
            <Header />
            <Outlet />
        </AuthProvider>
    );
};

export default AuthLayout;
