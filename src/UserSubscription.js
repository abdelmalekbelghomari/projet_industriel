import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from './firebaseConfig';
import DietModal from './components/DietModal';
import TasteModal from './components/TasteModal';
import KitchenModal from './components/KitchenModal';
import GoalsModal from './components/GoalsModal';
import HouseholdModal from './components/HouseholdModal';

const UserSubscriptionPage = () => {
  const [currentModal, setCurrentModal] = useState(0); // Suivi du modal affiché
  const [modalData, setModalData] = useState({}); // Stockage des données des modals
  const [currentUserUid, setCurrentUserUid] = useState(null); // UID utilisateur

  // Récupérer l'UID de l'utilisateur connecté
  useEffect(() => {
    const fetchUserUid = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setCurrentUserUid(currentUser.uid);
      } else {
        console.error("Aucun utilisateur connecté.");
      }
    };

    fetchUserUid();
  }, []);

  const modals = [
    HouseholdModal,
    DietModal,
    TasteModal,
    KitchenModal,
    GoalsModal,
  ];

  // Fonction pour sauvegarder les données de chaque modal
  const handleSave = (data) => {
    setModalData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // Fonction pour mettre à jour Firestore après le dernier modal
  const updateUserData = async () => {
    if (!currentUserUid) return;
  
    try {
      console.log("Mise à jour de la base de données avec :", modalData);
      const userRef = doc(db, "users", currentUserUid);
      await updateDoc(userRef, modalData);
      console.log("Données utilisateur mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur Firebase :", error.code, error.message);
    }
  };

  const handleNext = () => {
    if (currentModal < modals.length - 1) {
      setCurrentModal((prev) => prev + 1);
    } else {
      console.log("Dernier modal atteint, mise à jour des données...");
      updateUserData(); // Mise à jour de Firestore après le dernier modal
    }
  };

  const CurrentModal = modals[currentModal];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <CurrentModal
        onClose={() => console.log("Modal fermé")}
        onNext={handleNext}
        onSave={handleSave} // Passe la fonction handleSave aux modals
      />
    </div>
  );
};

export default UserSubscriptionPage;
