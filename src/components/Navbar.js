import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/* Corrected paths for the SVGs */
import FranceFlag from '../assets/icons/france.svg';
import LocationIcon from '../assets/icons/location.svg';
import CartIcon from '../assets/icons/cart.svg';
import UserIcon from '../assets/icons/user.svg';
import logo from '../assets/icons/logo.svg';

/* Import UserMenu */
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicking outside of it
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Quicklibox Logo" className="logo-image" />
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className="nav-menu">
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
        <li className="nav-item">
          <Link to="/vendre" className="nav-links">
            Vendre chez EatyBox
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/partenaires" className="nav-links">
            Gestion des partenaires
          </Link>
        </li>
      </ul>

      {isMenuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <Link to="/subscriptions" onClick={closeMenu}>
            Nos Abonnements
          </Link>
          <Link to="/about" onClick={closeMenu}>
            À Propos
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Nous Contacter
          </Link>
          <Link to="/vendre" className="nav-links">
            Vendre chez EatyBox
          </Link>
        </div>
      )}

      {/* Ajout des icônes avec UserMenu */}
      <div className="navbar-icons">
        <img src={FranceFlag} alt="French flag" className="icon" />
        {/* <img src={LocationIcon} alt="Location icon" className="icon" /> */}
        <img src={CartIcon} alt="Cart icon" className="icon" />
        <UserMenu/>
        <div className="h-3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
