import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideNavbarWorker from './components/SideNavbarWorker';
import ManagePartners from './ManagePartners'; 


const WorkerPage = () => {
    return (
        <div className="worker-container" style={{ display: 'flex' }}>
            {/* Sidebar */}
            <SideNavbarWorker />

            {/* Main Content */}
            <div className="worker-content">
                <Routes>
                    <Route path="/partenaires" element={<ManagePartners />} />
                </Routes>
            </div>
        </div>
    );
};

export default WorkerPage;
