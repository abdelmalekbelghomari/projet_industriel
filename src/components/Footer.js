// Footer.js
import React from 'react';
import './Footer.css';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Twitter from '../assets/icons/twitter.svg';



const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>A propos</h3>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
      </div>
      <div className="footer-section">
        <h3>Une question</h3>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
      </div>
      <div className="footer-section">
        <h3>Autre</h3>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
      </div>
      <div className="footer-section social">
        <h3>Suivez-nous</h3>
        <div className="social-icons">
          <img src={Facebook} alt="Facebook" className="icon" />
          <img src={Instagram} alt="Instagram" className="icon" />
          <img src={Twitter} alt="Twitter" className="icon" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024-2025 Ecolobox - Tous droits réservés - contact@ecolobox.com</p>
      </div>
    </footer>
  );
};

export default Footer;