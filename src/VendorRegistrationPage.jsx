import React from 'react';
import VendorRegistrationForm from './components/VendorRegistrationFrom';
import LogoSVG from './assets/icons/logo.svg'

export default function VendorRegistrationPage(){
    const logoPath = LogoSVG
    return (
        <VendorRegistrationForm logoPath={logoPath}/>
    )
}