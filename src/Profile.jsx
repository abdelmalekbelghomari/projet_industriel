import React from 'react';
import LoginForm from './components/LoginFrom'


export default function ProfilePage() {
    const link = "/selectRole";
    return (
        <div>
            <LoginForm link={link} />
        </div>
    )
}