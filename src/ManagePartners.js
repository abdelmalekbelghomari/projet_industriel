import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import "./ManagePartners.css";

function ManagePartners() {
  const [pendingPartners, setPendingPartners] = useState([]);
  const [validatedPartners, setValidatedPartners] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user);
      } else {
        console.error("Aucun utilisateur connecté.");
      }
    };

    fetchCurrentUser();
  }, []);
  // Fetch pending partners
  const fetchPendingPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pendingPartners"));
      const partners = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Pending partners:", partners);
      setPendingPartners(partners);
    } catch (error) {
      console.error("Error fetching pending partners:", error);
    }
  };

  // Fetch validated partners
  const fetchValidatedPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const partners = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setValidatedPartners(partners);
    } catch (error) {
      console.error("Error fetching validated partners:", error);
    }
  };

  // Validate a partner
  const handleValidatePartner = async (partner) => {
    try {
      const { id, marketName, description, adress, ...partnerData } = partner;
      const userRef = doc(db, "users", currentUser.uid);
  
      // 🔍 1. Récupérer les anciennes données de l'utilisateur
      const userSnap = await getDoc(userRef);
      let existingData = userSnap.exists() ? userSnap.data() : {};
  
      // 🚀 2. Ajouter uniquement les champs du marché sans toucher aux autres
      await setDoc(userRef, {
        ...existingData, // 🛑 Garde `displayName` et les autres données
        marketName: marketName || existingData.marketName || "", // Si déjà existant, on garde
        marketDescription: description || existingData.marketDescription || "",
        marketAdress: adress || existingData.marketAdress || ""
      });
  
      // 🗑️ 3. Supprimer l'entrée dans `pendingPartners`
      await deleteDoc(doc(db, "pendingPartners", id));
  
      // 🔄 4. Mettre à jour l'état local
      setPendingPartners((prev) => prev.filter((p) => p.id !== id));
      setValidatedPartners((prev) => [...prev, { ...existingData, marketName, marketDescription: description, marketAdress: adress, id: currentUser.uid }]);
  
      console.log("Partner validated and moved to users.");
    } catch (error) {
      console.error("Error validating partner:", error);
    }
  };

  // Remove a partner from pendingPartners
  const handleRemovePartner = async (partnerId) => {
    try {
      const partnerDoc = doc(db, "pendingPartners", partnerId);
      await deleteDoc(partnerDoc);

      // Update local state
      setPendingPartners((prev) => prev.filter((partner) => partner.id !== partnerId));

      console.log("Partner removed from pendingPartners.");
    } catch (error) {
      console.error("Error removing partner:", error);
    }
  };

  useEffect(() => {
    fetchPendingPartners();
    fetchValidatedPartners();
  }, []);

  return (
    <div className="manage-partners">
      <h2>Manage Partners</h2>

      <div className="pending-partners-section">
        <h3>Pending Partners</h3>
        <div className="partners-list">
          {pendingPartners.length === 0 ? (
            <p>No pending partners.</p>
          ) : (
            pendingPartners.map((partner) => (
              <div key={partner.id} className="partner-container">
                <p><strong>Market Name:</strong> {partner.marketName}</p>
                <p><strong>Address:</strong> {partner.adress}</p>
                <p><strong>Email:</strong> {partner.email}</p>
                <p><strong>Phone:</strong> {partner.phone}</p>
                <p><strong>Description:</strong> {partner.description}</p>
                <div className="buttons">
                  <button onClick={() => handleValidatePartner(partner)} className="approve-btn">Yes</button>
                  <button onClick={() => handleRemovePartner(partner.id)} className="remove-btn">No</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="validated-partners-section">
        <h3>Validated Partners</h3>
        <div className="partners-list">
          {validatedPartners.length === 0 ? (
            <p>No validated partners.</p>
          ) : (
            validatedPartners.map((partner) => (
              <div key={partner.id} className="partner-container">
                <p><strong>Market Name:</strong> {partner.marketName}</p>
                <p><strong>Address:</strong> {partner.adress}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Phone:</strong> {partner.phone}</p>
                <p><strong>Description:</strong> {partner.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagePartners;
