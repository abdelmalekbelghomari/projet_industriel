// HowItWorksSection.js
import React from 'react';
import HowItWorksCard from './HowItWorksCard';
// import './HowItWorksSection.css';

// Import your icons
import subscriptionIcon from '../assets/icons/crown.svg';
import boxIcon from '../assets/icons/box.svg';
import deliveryIcon from '../assets/icons/delivery.svg';

const HowItWorksSection = () => {
  return (
    <div className="mt-20 mb-20 bg-customRed p-10">
      <div className='text-white text-3xl text-center'>Comment ça marche ?</div>
      <div className="flex flex-row mt-10 space-x-10 justify-center">
        <HowItWorksCard icon={subscriptionIcon} label="Prend ton abonnement" />
        <HowItWorksCard icon={boxIcon} label="Choisis ta box" />
        <HowItWorksCard icon={deliveryIcon} label="Reçois ta box chez toi" />
      </div>
    </div>
  );
};

export default HowItWorksSection;
