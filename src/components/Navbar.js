import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

/* Corrected paths for the SVGs */
import FranceFlag from '../assets/icons/france.svg';
import LocationIcon from '../assets/icons/location.svg';
import CartIcon from '../assets/icons/cart.svg';
import UserIcon from '../assets/icons/user.svg';
import logo from '../assets/icons/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled , setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Quicklibox Logo" className="logo-image" />
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className="nav-menu">
        {/* <li className="nav-item">
          <Link to="/products" className="nav-links">
            Nos Produits
          </Link>
        </li> */}
        {/* <div className='red-bg '> */}
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
        {/* </div> */}
        {/* <li className="nav-item">
          <Link to="/vendre" className="nav-links">
            Vendre chez EatyBox
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/partenaires" className="nav-links">
            Gestion des partenaires
          </Link>
        </li> */}
      </ul>

      {isMenuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          {/* <Link to="/products" onClick={closeMenu}>
            Nos Produits
          </Link> */}
          <Link to="/subscriptions" onClick={closeMenu}>
            Nos Abonnements
          </Link>
          <Link to="/about" onClick={closeMenu}>
            À Propos
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Nous Contacter
          </Link>
          {/* <Link to="/vendre" className="nav-links">
            Vendre chez EatyBox
          </Link> */}
        </div>
      )}

      {/* Add SVG icons */}
      <div className="navbar-icons">
        <img src={FranceFlag} alt="French flag" className="icon" />
        <img src={LocationIcon} alt="Location icon" className="icon" />
        <img src={CartIcon} alt="Cart icon" className="icon" />
        <Link to="/profile" className='nav-links'>
          <img src={UserIcon} alt="User icon" className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
