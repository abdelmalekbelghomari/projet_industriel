import React, { useState, useEffect } from "react";
import { db, auth } from "./firebaseConfig"; // Import Firebase config et auth
import { collection, addDoc } from "firebase/firestore";
import "./Registration.css";
import emailjs from "@emailjs/browser";
import { onAuthStateChanged } from "firebase/auth";

function Registration() {
  const [formData, setFormData] = useState({
    phone: "",
    marketName: "",
    description: "",
    adress: "",
  });

  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);

  // Récupérer l'utilisateur connecté et son email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setStatus("Vous devez être connecté pour vous inscrire.");
      return;
    }

    const partnerData = {
      uid: user.uid, // Ajout du UID
      email: user.email, // Récupération de l’email Firebase
      ...formData,
    };

    // Ajouter les données du partenaire à Firestore
    try {
      await addDoc(collection(db, "pendingPartners"), partnerData);
      console.log("Les données du partenaire ont été enregistrées dans Firestore.");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Firestore :", error);
      setStatus("Une erreur s'est produite. Veuillez réessayer.");
      return; // Arrête l'exécution si Firestore échoue
    }

    // Envoi de l'email via EmailJS
    const serviceID = "service_55hi8a1";
    const templateID = "template_pkr1vuq";
    const userID = "ozXAuK2CVb2KPwx23";

    const templateParams = {
      email: user.email, // Utilisation de l'email Firebase
      phone: formData.phone,
      marketName: formData.marketName,
      description: formData.description,
      adress: formData.adress,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("L'e-mail a été envoyé avec succès !");
          setFormData({
            phone: "",
            marketName: "",
            description: "",
            adress: "",
          });
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
          setStatus("Une erreur s'est produite. Veuillez réessayer.");
        }
      );
  };

  return (
    <div className="registration-container">
      <h2>Inscription</h2>

      {!user ? (
        <p className="status-message">Veuillez vous connecter pour vous inscrire.</p>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="marketName">Nom du marché</label>
            <input
              type="text"
              id="marketName"
              name="marketName"
              value={formData.marketName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description du marché</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adress">Adresse du marché</label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      )}

      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Registration;
