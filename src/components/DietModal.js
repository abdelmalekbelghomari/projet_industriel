import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { ReactComponent as ClassicIcon } from '../assets/icons/classic.svg';
import { ReactComponent as VegetarianIcon } from '../assets/icons/vegetarian.svg';
import { ReactComponent as VeganIcon } from '../assets/icons/vegan.svg';
import { ReactComponent as HalalIcon } from '../assets/icons/halal.svg';
import { ReactComponent as GlutenFreeIcon } from '../assets/icons/gluten_free.svg';
import { ReactComponent as DairyFreeIcon } from '../assets/icons/dairy_free.svg';
import { ReactComponent as PescoVegetarianIcon } from '../assets/icons/pesco_vegetarian.svg';
import { ReactComponent as OtherIcon } from '../assets/icons/other.svg';
import './DietModal.css';

const DietModal = ({ onClose, onNext }) => {
  const [selectedDiets, setSelectedDiets] = useState([]); // Tableau pour stocker les régimes sélectionnés

  // Fonction pour ajouter/retirer un régime sélectionné
  const handleDietClick = (diet) => {
    setSelectedDiets((prevSelected) =>
      prevSelected.includes(diet)
        ? prevSelected.filter((item) => item !== diet) // Retirer si déjà sélectionné
        : [...prevSelected, diet] // Ajouter si non sélectionné
    );
  };

  // Vérifier si un régime est sélectionné
  const isSelected = (diet) => selectedDiets.includes(diet);

  return (
    <ProfileModal
      progress={25}
      title="Votre régime"
      subtitle="Avez-vous un régime particulier ?"
      onClose={onClose}
      onNext={onNext}
    >
      <div className="diet-icons">
        <button
          onClick={() => handleDietClick('classic')}
          className={isSelected('classic') ? 'selected' : ''}
        >
          <ClassicIcon className={`diet-icon ${isSelected('classic') ? 'selected' : ''}`} />
          <span>Classique</span>
        </button>
        <button
          onClick={() => handleDietClick('vegetarian')}
          className={isSelected('vegetarian') ? 'selected' : ''}
        >
          <VegetarianIcon className={`diet-icon ${isSelected('vegetarian') ? 'selected' : ''}`} />
          <span>Végétarien</span>
        </button>
        <button
          onClick={() => handleDietClick('vegan')}
          className={isSelected('vegan') ? 'selected' : ''}
        >
          <VeganIcon className={`diet-icon ${isSelected('vegan') ? 'selected' : ''}`} />
          <span>Végétalien</span>
        </button>
        <button
          onClick={() => handleDietClick('halal')}
          className={isSelected('halal') ? 'selected' : ''}
        >
          <HalalIcon className={`diet-icon ${isSelected('halal') ? 'selected' : ''}`} />
          <span>Sans porc</span>
        </button>
        <button
          onClick={() => handleDietClick('glutenFree')}
          className={isSelected('glutenFree') ? 'selected' : ''}
        >
          <GlutenFreeIcon className={`diet-icon ${isSelected('glutenFree') ? 'selected' : ''}`} />
          <span>Sans gluten</span>
        </button>
        <button
          onClick={() => handleDietClick('dairyFree')}
          className={isSelected('dairyFree') ? 'selected' : ''}
        >
          <DairyFreeIcon className={`diet-icon ${isSelected('dairyFree') ? 'selected' : ''}`} />
          <span>Sans produit laitier</span>
        </button>
        <button
          onClick={() => handleDietClick('pescoVegetarian')}
          className={isSelected('pescoVegetarian') ? 'selected' : ''}
        >
          <PescoVegetarianIcon
            className={`diet-icon ${isSelected('pescoVegetarian') ? 'selected' : ''}`}
          />
          <span>Pesco-végétarien</span>
        </button>
        <button
          onClick={() => handleDietClick('other')}
          className={isSelected('other') ? 'selected' : ''}
        >
          <OtherIcon className={`diet-icon ${isSelected('other') ? 'selected' : ''}`} />
          <span>Autre</span>
        </button>
      </div>
    </ProfileModal>
  );
};

export default DietModal;
