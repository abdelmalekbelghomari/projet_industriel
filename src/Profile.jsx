import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoginForm from './components/LoginFrom';

export default function ProfilePage() {
    const navigate = useNavigate();
    const link = "/selectRole";

    useEffect(() => {
        const cookies = document.cookie;
        if (cookies.includes('auth_token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div>
            <LoginForm link={link} />
        </div>
    );
}
