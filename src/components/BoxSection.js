// BoxSection.js
import React from 'react';
import BoxCard from './BoxCard';
import './BoxSection.css';


import quickMealImage from '../assets/icons/quick.svg';
import classicMealImage from '../assets/icons/classic.svg';
import vegetarianMealImage from '../assets/icons/vegetarian.svg';
import lowCalorieMealImage from '../assets/icons/low_calorie.svg';

const BoxSection = () => {
  return (
    <div className="box-cards-container">
      <h2>Nos différentes boxes pour vous</h2>
      <div className="box-cards">
        <BoxCard image={quickMealImage} label="Repas rapide" />
        <BoxCard image={classicMealImage} label="Classic" />
        <BoxCard image={lowCalorieMealImage} label="Faible calorie" />
        <BoxCard image={vegetarianMealImage} label="Végétarien" />
      </div>
    </div>
  );
};

export default BoxSection;
