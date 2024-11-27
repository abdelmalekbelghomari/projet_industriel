import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; 
import "./ManagePartners.css"; 

function ManagePartners() {
  const [pendingPartners, setPendingPartners] = useState([]);


  const fetchPendingPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pendingPartners"));
      const partners = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Pending partners:", partners); // Vérifiez si les données sont récupérées
      setPendingPartners(partners);
    } catch (error) {
      console.error("Error fetching pending partners:", error);
    }
  };


  const handleValidatePartner = async (partner) => {
    try {
      // Destructure the partner object to exclude `id`
      const { id, ...partnerData } = partner;
  
      // Add the partner data to ValidatedPartners
      await addDoc(collection(db, "ValidatedPartners"), partnerData);
  
      // Remove the partner from pendingPartners
      const partnerDoc = doc(db, "pendingPartners", id);
      await deleteDoc(partnerDoc);
  
      // Update the local state
      setPendingPartners((prev) => prev.filter((p) => p.id !== id));
  
      console.log("Partner validated and moved to ValidatedPartners.");
    } catch (error) {
      console.error("Error validating partner:", error);
    }
  };

  const handleRemovePartner = async (partnerId) => {
    try {
      const partnerDoc = doc(db, "pendingPartners", partnerId);
      await deleteDoc(partnerDoc);
  
      // Mettez à jour l'état local
      setPendingPartners((prev) => prev.filter((partner) => partner.id !== partnerId));
    } catch (error) {
      console.error("Error removing partner:", error);
    }
  };

  useEffect(() => {
    fetchPendingPartners();
  }, []);

  return (
    <div className="manage-partners">
      <h2>Manage Pending Partners</h2>
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
  );
}

export default ManagePartners;
