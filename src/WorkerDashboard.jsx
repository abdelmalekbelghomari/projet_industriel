import React from "react";
import { Link } from "react-router-dom";
import "./WorkerDashboard.css";

const WorkerDashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Titre */}
            <h1 className="dashboard-title">Tableau de Bord</h1>

            {/* Statistiques fictives */}
            <div className="stats-container">
                <div className="stat-card">
                    <h2>320</h2>
                    <p>Utilisateurs</p>
                </div>
                <div className="stat-card orders">
                    <h2>124</h2>
                    <p>Commandes traitées</p>
                </div>
                <div className="stat-card payments">
                    <h2>87</h2>
                    <p>Paiements effectués</p>
                </div>
            </div>

            {/* Section Notifications */}
            <div className="notifications">
                <h2>Notifications récentes</h2>
                <ul>
                    <li>📌 10 nouvelles commandes reçues</li>
                    <li>✅ 5 nouveaux utilisateurs inscrits</li>
                    <li>🔔 2 paiements en attente</li>
                </ul>
            </div>
        </div>
    );
};

export default WorkerDashboard;
