import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideNavbarWorker from './components/SideNavbarWorker';
import ManagePartners from './ManagePartners';
import WorkerDashboard from './WorkerDashboard';
import UserManagement from './UserManagement';
import Orders from './Orders';
import './WorkerPage.css'; 

const WorkerPage = () => {
    return (
        <div className="worker-container">
            {/* Sidebar */}
            <SideNavbarWorker />

            {/* Main Content */}
            <div className="worker-content">
                <Routes>
                    <Route path="/partenaires" element={<ManagePartners />} />
                    <Route path="/" element={<WorkerDashboard />} />
                    <Route path="/gestion-utilisateurs" element={<UserManagement />} />
                    <Route path="/commandes" element={<Orders />} />
                </Routes>
            </div>  
        </div>
    );
};

export default WorkerPage;
