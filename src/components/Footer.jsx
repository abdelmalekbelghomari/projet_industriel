// Footer.js
import React from 'react';
// import './Footer.css';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Twitter from '../assets/icons/twitter.svg';

const Footer = () => {
  return (
    <footer className="footer-container bg-customRed rounded-t-3xl text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <div className='text-center'>
          <h3 className="text-lg text-white font-semibold mb-4">À propos</h3>
          <p className="text-white">EatyBox propose des box repas responsables, composées d’ingrédients locaux et frais.</p>
          <p className="text-white">Notre mission : soutenir les commerces de proximité et promouvoir une alimentation durable.</p>
        </div>
        <div className='text-center'>
          <h3 className="text-lg text-white font-semibold mb-4">Une question ?</h3>
          <ul className="text-white">
            <li className="mb-2"><a href="/404" className="hover:underline">Consultez notre FAQ</a></li>
            <li className="mb-2"><a href="mailto:contact@eatybox.com" className="hover:underline">Envoyez-nous un email</a></li>
            <li>Appelez-nous au : 02 31 45 67 89</li>
          </ul>
        </div>
        <div className='text-center'>
          <h3 className="text-lg text-white font-semibold mb-4">Informations légales</h3>
          <ul className="text-white">
            <li className="mb-2"><a href="/legal" className="hover:underline">Mentions légales</a></li>
            <li><a href="/privacy" className="hover:underline">Politique de confidentialité</a></li>
          </ul>
        </div>
        <div>
        <h3 className="text-lg text-white font-semibold mb-4">Suivez-nous</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com/EatyBox" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="Facebook" className="w-10" />
            </a>
            <a href="https://instagram.com/EatyBox" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="Instagram" className="w-10" />
            </a>
            <a href="https://twitter.com/EatyBox" target="_blank" rel="noopener noreferrer">
              <img src={Twitter} alt="Twitter" className="w-10" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 pt-4">
      <p className="inline-block border-t border-black pt-4">
        © 2024-2025 EatyBox - Tous droits réservés - 
        <a href="mailto:contact@eatybox.com" className="hover:underline">contact@eatybox.com</a>
      </p>
      </div>
    </footer>
  );
};

export default Footer;