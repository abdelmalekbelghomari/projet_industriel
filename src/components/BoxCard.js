// BoxCard.js
import React from 'react';
import './BoxCard.css';

const BoxCard = ({ image, label }) => {
  return (
    <div className="box-card">
      <div className="box-image">
        <img src={image} alt={label} />
      </div>
      <p className="box-label">{label}</p>
    </div>
  );
};

export default BoxCard;