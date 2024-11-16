import React from 'react';
import BasketSub1 from './assets/images/basket_sub.png';
import CommingSoon from './assets/images/coming-soon_256.png';
import SubCard from './components/SubCard';
import './Subscriptions.css';


function Subscriptions() {
    return (
        <div className="flex justify-center space-x-8">
            <SubCard title="Abonnement Basique" image={CommingSoon} rating={4.6} price="--€" disabled />
            <SubCard title="Abonnement Du Chef" image={BasketSub1} rating={4.9} price="49€" large />
            <SubCard title="Abonnement Premium" image={CommingSoon} rating={4.9} price="--€" disabled />
        </div>
    );
}

export default Subscriptions;