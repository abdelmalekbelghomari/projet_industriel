import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';  // Firebase import
import SideNavbarVendor from './components/SideNavbarVendor';
import Registration from './Registration';
import VendorDetails from './VendorDetails'; 
import VendorProductManagement from './VendorProductManagement'
import VendorProductList from './VendorProductList'
import './WorkerPage.css';

const VendorPage = () => {
    const [isRegistered, setIsRegistered] = useState(null); // `null` means loading

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) {
                console.error("❌ No authenticated user.");
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("🔍 User Data:", userData);
                    setIsRegistered(!!userData.marketName); // If `marketName` exists, user is registered
                } else {
                    setIsRegistered(false);
                }
            } catch (error) {
                console.error("❌ Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    if (isRegistered === null) {
        return <p>Chargement...</p>; // Loading state
    }

    return (
        <div className="vendor-container" style={{ display: 'flex' }}>
            {/* Sidebar - Always Visible */}
            <SideNavbarVendor />

            {/* Content that changes with routes */}
            <div className="vendor-content">
                <Routes>
                    <Route index element={<h1>Bienvenue sur la page commerçant</h1>} />
                    <Route 
                        path="registration" 
                        element={isRegistered ? <VendorDetails /> : <Registration />} 
                    />
                    <Route path="products" element={<VendorProductManagement />} />
                    <Route path="my-products" element={<VendorProductList />} /> {/* ✅ New Route */}
                </Routes>
            </div>
        </div>
    );
};

export default VendorPage;
