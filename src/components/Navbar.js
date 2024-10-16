import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }; 

  window.addEventListener('resize', showButton);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">EcolocoBox</Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/services" className="nav-links">
            Services
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-links">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sign-up" className="nav-links-mobile">
            Sign Up
          </Link>
        </li>
      </ul>
      {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
    </nav>
  );
};

export default Navbar;