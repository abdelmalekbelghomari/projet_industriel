import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { ReactComponent as FryerIcon } from '../assets/icons/fryer.svg';
import { ReactComponent as OvenIcon } from '../assets/icons/oven.svg';
import { ReactComponent as MicrowaveIcon } from '../assets/icons/microwave.svg';
import { ReactComponent as StoveIcon } from '../assets/icons/stove.svg';
import { ReactComponent as MixerIcon } from '../assets/icons/mixer.svg';
import { ReactComponent as AirFryerIcon } from '../assets/icons/air_fryer.svg';
import './KitchenModal.css';

const KitchenModal = ({ onClose, onNext, onSave }) => {
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const handleEquipmentClick = (equipment) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment) // Unselect if already selected
        : [...prev, equipment] // Add to selected if not already selected
    );
  };

  const handleNext = () => {
    onSave({ kitchenEquipment: selectedEquipment }); // Transmet les équipements sélectionnés au parent
    onNext(); // Passe au modal suivant
  };

  return (
    <ProfileModal
      progress={75}
      title="Votre cuisine"
      subtitle="Quels sont vos équipements de cuisine ?"
      onClose={onClose}
      onNext={handleNext}
    >
      <div className="kitchen-icons">
        <button
          onClick={() => handleEquipmentClick('fryer')}
          className={selectedEquipment.includes('fryer') ? 'selected' : ''}
        >
          <FryerIcon
            className={`kitchen-icon ${selectedEquipment.includes('fryer') ? 'selected' : ''}`}
          />
          <span>Friteuse</span>
        </button>
        <button
          onClick={() => handleEquipmentClick('oven')}
          className={selectedEquipment.includes('oven') ? 'selected' : ''}
        >
          <OvenIcon
            className={`kitchen-icon ${selectedEquipment.includes('oven') ? 'selected' : ''}`}
          />
          <span>Four</span>
        </button>
        <button
          onClick={() => handleEquipmentClick('microwave')}
          className={selectedEquipment.includes('microwave') ? 'selected' : ''}
        >
          <MicrowaveIcon
            className={`kitchen-icon ${selectedEquipment.includes('microwave') ? 'selected' : ''}`}
          />
          <span>Micro-ondes</span>
        </button>
        <button
          onClick={() => handleEquipmentClick('stove')}
          className={selectedEquipment.includes('stove') ? 'selected' : ''}
        >
          <StoveIcon
            className={`kitchen-icon ${selectedEquipment.includes('stove') ? 'selected' : ''}`}
          />
          <span>Plaques de cuisson</span>
        </button>
        <button
          onClick={() => handleEquipmentClick('mixer')}
          className={selectedEquipment.includes('mixer') ? 'selected' : ''}
        >
          <MixerIcon
            className={`kitchen-icon ${selectedEquipment.includes('mixer') ? 'selected' : ''}`}
          />
          <span>Mixeur</span>
        </button>
        <button
          onClick={() => handleEquipmentClick('airFryer')}
          className={selectedEquipment.includes('airFryer') ? 'selected' : ''}
        >
          <AirFryerIcon
            className={`kitchen-icon ${selectedEquipment.includes('airFryer') ? 'selected' : ''}`}
          />
          <span>Air fryer</span>
        </button>
      </div>
    </ProfileModal>
  );
};

export default KitchenModal;
