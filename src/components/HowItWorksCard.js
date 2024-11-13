// HowItWorksCard.js
import React from 'react';
import './HowItWorksCard.css';

const HowItWorksCard = ({ icon, label }) => {
  return (
    <div className="how-it-works-card">
      <div className="how-it-works-icon">
        <img src={icon} alt={label} />
      </div>
      <p className="how-it-works-label">{label}</p>
    </div>
  );
};

export default HowItWorksCard;
