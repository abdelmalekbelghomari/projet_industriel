import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { ReactComponent as Sticker } from '../assets/icons/stickman.svg'; // Import SVG as React Component
import './HouseholdModal.css';

const HouseholdModal = ({ onClose, onNext }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleAdultClick = (count) => setAdults(count);
  const handleChildrenClick = (count) => setChildren(count);

  return (
    <ProfileModal
      progress={10}
      title="Votre foyer"
      subtitle="Dites nous tout sur votre chez vous"
      onClose={onClose}
      onNext={onNext}
    >
      <div className="household-section">
        <div className="category">
          <h3>Adultes</h3>
          <div className="icons">
            {[1, 2, 3, 4, 5].map((count) => (
              <button
                key={`adult-${count}`}
                onClick={() => handleAdultClick(count)}
                className={adults >= count ? 'selected' : ''}
              >
                <Sticker
                  className={`sticker ${adults >= count ? 'selected' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="category">
          <h3>Enfants</h3>
          <div className="icons">
            {[0, 1, 2, 3, 4].map((count) => (
              <button
                key={`child-${count}`}
                onClick={() => handleChildrenClick(count)}
                className={children >= count ? 'selected' : ''}
              >
                <Sticker
                  className={`sticker ${children >= count ? 'selected' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ProfileModal>
  );
};

export default HouseholdModal;
