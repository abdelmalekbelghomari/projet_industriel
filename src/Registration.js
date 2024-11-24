import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import "./Registration.css";
import emailjs from "@emailjs/browser";

function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    marketName: "",
    description: "",
    adress: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add partner data to Firestore
    try {
      await addDoc(collection(db, "pendingPartners"), formData);
      console.log("Les données du partenaire ont été enregistrées dans Firestore.");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Firestore :", error);
      setStatus("Une erreur s'est produite. Veuillez réessayer.");
      return; // Arrête l'exécution si Firestore échoue
    }

    // Send email notification via EmailJS
    const serviceID = "service_55hi8a1";
    const templateID = "template_pkr1vuq";
    const userID = "ozXAuK2CVb2KPwx23";

    const templateParams = {
      email: formData.email,
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
            email: "",
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
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
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
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Registration;
