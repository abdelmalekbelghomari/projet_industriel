import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { ReactComponent as RecycleIcon } from '../assets/icons/recycle.svg';
import { ReactComponent as YogaIcon } from '../assets/icons/yoga.svg';
import { ReactComponent as CookIcon } from '../assets/icons/cook.svg';
import { ReactComponent as MoneyIcon } from '../assets/icons/money.svg';
import './GoalsModal.css';

const GoalsModal = ({ onClose, onNext, onSave }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleGoalClick = (goal) => {
    if (goal === 'money') {
      // Ensure 'money' can only be selected once
      setSelectedGoals((prev) =>
        prev.includes(goal) ? prev.filter((item) => item !== goal) : [...prev, goal]
      );
    } else {
      // Toggle selection for other goals
      setSelectedGoals((prev) =>
        prev.includes(goal) ? prev.filter((item) => item !== goal) : [...prev, goal]
      );
    }
  };

  const handleNext = () => {
    console.log("Selected goals before saving:", selectedGoals);
    onSave({ goals: selectedGoals }); // Transmet les objectifs sélectionnés au parent
    onNext(); // Passe au modal suivant
  };

  return (
    <ProfileModal
      progress={90}
      title="Votre objectifs"
      subtitle="Jow vous accompagne sur tous ces challenges du quotidien"
      onClose={onClose}
      onNext={handleNext}
    >
      <div className="goals-list">
        <button
          onClick={() => handleGoalClick('recycle')}
          className={selectedGoals.includes('recycle') ? 'selected' : ''}
        >
          <RecycleIcon
            className={`goal-icon ${selectedGoals.includes('recycle') ? 'selected' : ''}`}
          />
          <span>Éviter les achats superflus</span>
        </button>
        <button
          onClick={() => handleGoalClick('yoga')}
          className={selectedGoals.includes('yoga') ? 'selected' : ''}
        >
          <YogaIcon
            className={`goal-icon ${selectedGoals.includes('yoga') ? 'selected' : ''}`}
          />
          <span>Diminuer ma charge mentale</span>
        </button>
        <button
          onClick={() => handleGoalClick('cook')}
          className={selectedGoals.includes('cook') ? 'selected' : ''}
        >
          <CookIcon
            className={`goal-icon ${selectedGoals.includes('cook') ? 'selected' : ''}`}
          />
          <span>Cuisiner et découvrir des recettes</span>
        </button>
        <button
          onClick={() => handleGoalClick('money')}
          className={selectedGoals.includes('money') ? 'selected' : ''}
        >
          <MoneyIcon
            className={`goal-icon ${selectedGoals.includes('money') ? 'selected' : ''}`}
          />
          <span>Payer moins cher mes courses</span>
        </button>
      </div>
    </ProfileModal>
  );
};

export default GoalsModal;
