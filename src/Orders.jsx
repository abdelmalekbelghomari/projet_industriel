import React from "react";
import "./Orders.css"; // Ajoute le fichier CSS correspondant
import { FaCog, FaChevronDown } from "react-icons/fa"; // Icônes pour les actions

const Orders = () => {
  // Données statiques pour l'affichage
  const orders = [
    { id: "#0201", client: "Jean Dupont", status: "En préparation", color: "red" },
    { id: "#0251", client: "Jean Dupont", status: "En cours de livraison", color: "orange" },
    { id: "#0301", client: "Jean Dupont", status: "Livré", color: "green" },
    { id: "#0222", client: "Jean Dupont", status: "Annulé", color: "gray" },
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">Commande</h2>
      <p className="orders-subtitle">28 commandes trouvées</p>

      {/* Barre de filtres */}
      <div className="orders-filters">
        <span className="active-filter">Commande</span>
        <span>Préparation</span>
        <span>En cours</span>
        <span>Livré</span>
        <div className="date-filters">
          <input type="date" className="date-input" />
          <span> à </span>
          <input type="date" className="date-input" />
        </div>
      </div>

      {/* Tableau des commandes */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Client</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>
                <span className="status-dot" style={{ backgroundColor: order.color }}></span>
                {order.status}
              </td>
              <td className="actions">
                <FaCog className="icon-action" />
                <FaChevronDown className="icon-action" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
