import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // 🔵 Status Color Mapping
  const statusColors = {
    "En préparation": "red",
    "En cours de livraison": "orange",
    "Livré": "green",
    "Annulé": "gray",
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 Gestion des Commandes</h2>
      <p className="orders-subtitle">{loading ? "Chargement..." : `${orders.length} commandes trouvées`}</p>

      {/* Orders Table */}
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
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">Chargement des commandes...</td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">Aucune commande trouvée.</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.displayName || "Inconnu"}</td>
                <td>
                  <span className="status-dot" style={{ backgroundColor: statusColors[order.status] || "blue" }}></span>
                  {order.status}
                </td>
                <td className="actions">
                  <button className="action-button">⚙️ Modifier</button>
                  <button className="action-button">⬇️ Détails</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
