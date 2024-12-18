import React, { useState } from 'react';
import DietModal from './components/DietModal';
import TasteModal from './components/TasteModal';
import KitchenModal from './components/KitchenModal';
import GoalsModal from './components/GoalsModal';
import HouseholdModal from './components/HouseholdModal';

const UserSubscriptionPage = () => {
  const [currentModal, setCurrentModal] = useState(0); // État pour suivre l'index du modal affiché

  const modals = [
    HouseholdModal,
    DietModal,
    TasteModal,
    KitchenModal,
    GoalsModal,
  ];

  const handleClose = () => {
    console.log('Closing Modal');
    // Ajoute ici une logique pour fermer complètement les modals si nécessaire
  };

  const handleNext = () => {
    if (currentModal < modals.length - 1) {
      setCurrentModal((prev) => prev + 1); // Passe au modal suivant
    } else {
      console.log('Last modal reached'); // Peut servir à fermer les modals après le dernier
    }
  };

  const CurrentModal = modals[currentModal]; // Récupère le composant actuel

  return (
    <div class="min-h-screen flex flex-col items-center justify-center">
      {/* Modal actuel s'affiche ici */}
      <CurrentModal onClose={handleClose} onNext={handleNext} />
    </div>
  );
};

export default UserSubscriptionPage;
