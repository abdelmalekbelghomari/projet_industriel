// HowItWorksSection.js
import React from 'react';
import HowItWorksCard from './HowItWorksCard';
import './HowItWorksSection.css';

// Import your icons
import subscriptionIcon from '../assets/icons/crown.svg';
import boxIcon from '../assets/icons/box.svg';
import deliveryIcon from '../assets/icons/delivery.svg';

const HowItWorksSection = () => {
  return (
    <div className="how-it-works-container">
      <h2>Comment ça marche ?</h2>
      <div className="how-it-works-cards">
        <HowItWorksCard icon={subscriptionIcon} label="Prend ton abonnement" />
        <HowItWorksCard icon={boxIcon} label="Choisis ta box" />
        <HowItWorksCard icon={deliveryIcon} label="Reçois ta box chez toi" />
      </div>
    </div>
  );
};

export default HowItWorksSection;
