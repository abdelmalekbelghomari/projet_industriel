import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./ManagePartners.css";

function ManagePartners() {
  const [pendingPartners, setPendingPartners] = useState([]);
  const [validatedPartners, setValidatedPartners] = useState([]);

  // Fetch pending partners
  const fetchPendingPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pendingPartners"));
      const partners = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingPartners(partners);
    } catch (error) {
      console.error("Error fetching pending partners:", error);
    }
  };

  // Fetch validated partners
  const fetchValidatedPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ValidatedPartners"));
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
      const { id, ...partnerData } = partner;
      await addDoc(collection(db, "ValidatedPartners"), partnerData);
      await deleteDoc(doc(db, "pendingPartners", id));

      setPendingPartners((prev) => prev.filter((p) => p.id !== id));
      setValidatedPartners((prev) => [...prev, { ...partnerData }]);
    } catch (error) {
      console.error("Error validating partner:", error);
    }
  };

  // Remove a partner from pendingPartners
  const handleRemovePartner = async (partnerId) => {
    try {
      await deleteDoc(doc(db, "pendingPartners", partnerId));
      setPendingPartners((prev) => prev.filter((partner) => partner.id !== partnerId));
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

      {/* White canvas background for sections */}
      <div className="partners-wrapper">

        {/* Pending Partners Section */}
        <div className="pending-partners-box">
          <h3>Pending Partners</h3>
          <div className="partners-list">
            {pendingPartners.length === 0 ? (
              <p className="empty-message">No current pending partners.</p>
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

        {/* Validated Partners Section */}
        <div className="validated-partners-box">
          <h3>Validated Partners</h3>
          <div className="partners-list">
            {validatedPartners.length === 0 ? (
              <p className="empty-message">No validated partners.</p>
            ) : (
              validatedPartners.map((partner) => (
                <div key={partner.id} className="partner-container">
                  <p><strong>Market Name:</strong> {partner.marketName}</p>
                  <p><strong>Address:</strong> {partner.adress}</p>
                  <p><strong>Email:</strong> {partner.email}</p>
                  <p><strong>Phone:</strong> {partner.phone}</p>
                  <p><strong>Description:</strong> {partner.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManagePartners;
