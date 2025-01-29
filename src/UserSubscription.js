import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import DietModal from './components/DietModal';
import TasteModal from './components/TasteModal';
import KitchenModal from './components/KitchenModal';
import GoalsModal from './components/GoalsModal';
import HouseholdModal from './components/HouseholdModal';
import Cookies from 'js-cookie';


const UserSubscriptionPage = () => {
  const [currentModal, setCurrentModal] = useState(0); // Suivi du modal affiché
  const [modalData, setModalData] = useState({}); // Stockage des données des modals
  const [currentUserUid, setCurrentUserUid] = useState(null); // UID utilisateur
  const [isLastModal, setIsLastModal] = useState(false);
  const navigate = useNavigate();

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
    setModalData((prevData) => {
      let updatedData = { ...prevData };
  
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          updatedData[key] = [...new Set(data[key])]; // Ensure unique values and avoid duplicates
        } else {
          updatedData[key] = data[key];
        }
      });
  
      console.log("Updated modalData:", updatedData);
      return updatedData;
    });
  };
  // Fonction pour mettre à jour Firestore après le dernier modal
  const updateUserData = async () => {
    if (!currentUserUid) return;
  
    try {
      const userRef = doc(db, "users", currentUserUid);
      console.log("Final data before saving to Firestore:", modalData);
      
      await setDoc(userRef, modalData, { merge: true });

      const cookie = Cookies.get("auth_token");
      if(!cookie){
        console.log("PAS DE COOKIE DECONNEXION");
      }
  
      console.log("Data successfully updated in Firestore!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating Firestore:", error.message);
    }
  };
  

  useEffect(() => {
    if (isLastModal) {
      updateUserData();
    }
  }, [modalData]);

  const handleNext = (data = null) => {
    if (data) {
      handleSave(data);
    }

    if (currentModal < modals.length - 1) {
      setCurrentModal((prev) => prev + 1);
    } else {
      setIsLastModal(true); // Set flag to trigger Firestore update
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
