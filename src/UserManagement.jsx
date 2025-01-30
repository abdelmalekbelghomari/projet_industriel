import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./UserManagement.css"; // Importation du style

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const filteredUsers = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => !user.marketName && user.isAdmin === false); // ✅ Filtrage

        setUsers(filteredUsers);
        console.log("✅ Utilisateurs chargés :", filteredUsers);
      } catch (error) {
        console.error("❌ Erreur de chargement des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-management-container">
      <h1 className="title">Gestion des utilisateurs</h1>
      <p className="subtitle">{users.length} utilisateur{users.length > 1 ? "s" : ""} trouvé{users.length > 1 ? "s" : ""}</p>

      {/* Tableau des utilisateurs */}
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3">Aucun utilisateur trouvé.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "Non renseigné"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
