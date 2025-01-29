import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../assets/icons/user.svg';
import Cookies from 'js-cookie';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Vérification continue de la connexion
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('auth_token');
      setIsLoggedIn(!!token); // Met à jour en fonction du cookie
    };

    checkAuth(); // Vérifier immédiatement au montage
    const interval = setInterval(checkAuth, 500); // Vérifier toutes les 500ms

    return () => clearInterval(interval); // Nettoyer l'intervalle au démontage
  }, []);

  // Toggle du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Ferme le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Gérer connexion/déconnexion
  const handleAuth = () => {
    if (isLoggedIn) {
      Cookies.remove('auth_token');
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setIsLoggedIn(true);
      navigate("/profile");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Icône utilisateur */}
      <img 
        src={UserIcon} 
        alt="User icon" 
        className="w-8 h-8 cursor-pointer" 
        onClick={toggleMenu} 
      />

      {/* Menu flottant */}
      {isOpen && (
        <div 
          ref={menuRef} 
          className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50"
        >
          {/* Afficher "Profil" seulement si connecté */}
          {isLoggedIn && (
            <Link 
              to="/profile" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Profil
            </Link>
          )}
          <button 
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
            onClick={handleAuth}
          >
            {isLoggedIn ? 'Déconnexion' : 'Connexion'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
