import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/* Corrected paths for the SVGs */
import FranceFlag from '../assets/icons/france.svg';
import LocationIcon from '../assets/icons/location.svg';
import CartIcon from '../assets/icons/cart.svg';
import UserIcon from '../assets/icons/user.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Quicklibox</Link>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/products" className="nav-links">
            Nos Produits
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/subscriptions" className="nav-links">
            Nos Abonnements
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-links">
          À Propos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-links">
            Nous Contacter
          </Link>
        </li>
      </ul>
      
      {/* Add SVG icons */}
      <div className="navbar-icons">
        <img src={FranceFlag} alt="French flag" className="icon" />
        <img src={LocationIcon} alt="Location icon" className="icon" />
        <img src={CartIcon} alt="Cart icon" className="icon" />
        <img src={UserIcon} alt="User icon" className="icon" />
      </div>
    </nav>
  );
}

export default Navbar;
