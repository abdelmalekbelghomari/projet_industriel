import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { ReactComponent as Sticker } from '../assets/icons/stickman.svg'; // Import SVG as React Component
import './HouseholdModal.css';

const HouseholdModal = ({ onClose, onNext, onSave }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(null); // Default: No selection

  const handleAdultClick = (count) => setAdults(count);

  const handleChildrenClick = (count) => {
    if (children === null && count > 0) {
      setChildren(1); // First click sets it to 1, highlights only 1
    } else {
      setChildren(count); // Normal behavior for the rest
    }
  };

  const handleNext = () => {
    onSave({ adults, children: children ?? 0 }); // Ensure 0 is saved properly
    onNext();
  };

  return (
    <ProfileModal
      progress={10}
      title="Votre foyer"
      subtitle="Dites nous tout sur votre chez vous"
      onClose={onClose}
      onNext={handleNext}
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
                <Sticker className={`sticker ${adults >= count ? 'selected' : ''}`} />
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
                className={children !== null && children >= count ? 'selected' : ''} // Fix: No default selection, but works normally after first click
              >
                <Sticker className={`sticker ${children !== null && children >= count ? 'selected' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ProfileModal>
  );
};

export default HouseholdModal;
