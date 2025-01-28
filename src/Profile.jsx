import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoginForm from './components/LoginFrom';

export default function ProfilePage() {
    const navigate = useNavigate();
    const link = "/vendorRegistration";

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const cookies = await Promise.resolve(document.cookie);
                if (cookies.includes('auth_token')) {
                    navigate('/dashboard'); 
                }
            } catch (error) {
                console.error("Erreur lors de la vérification des cookies :", error);
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div>
            <LoginForm link={link} />
        </div>
    );
}
