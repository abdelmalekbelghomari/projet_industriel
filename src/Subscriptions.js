import React from 'react';
import BasketSub1 from './assets/images/basket_sub.png';
import CommingSoon from './assets/images/coming-soon_256.png';
import SubCard from './components/SubCard';

function Subscriptions() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Content Section */}
            <div className="flex-grow flex items-center justify-center">
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
                    <SubCard title="Abonnement Basique" image={CommingSoon} rating={4.6} price="--€" disabled />
                    <SubCard title="Abonnement Du Chef" image={BasketSub1} rating={4.9} price="49€" large />
                    <SubCard title="Abonnement Premium" image={CommingSoon} rating={4.9} price="--€" disabled />
                </div>
            </div>
        </div>
    );
}

export default Subscriptions;
