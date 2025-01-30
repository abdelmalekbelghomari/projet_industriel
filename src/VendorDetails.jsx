import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const VendorDetails = () => {
    const [vendorData, setVendorData] = useState(null);

    useEffect(() => {
        const fetchVendorData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                setVendorData(userDoc.data());
            }
        };

        fetchVendorData();
    }, []);

    if (!vendorData) return <p>Chargement des informations...</p>;

    return (
        <div className="vendor-details">
            <h2>Vous êtes déjà inscrit</h2>
            <p><strong>Nom du marché:</strong> {vendorData.marketName || "Non renseigné"}</p>
            <p><strong>Email:</strong> {vendorData.email || "Non renseigné"}</p>
            <p><strong>Adresse:</strong> {vendorData.marketAdress || "Non renseigné"}</p>
            <p><strong>Description:</strong> {vendorData.marketDescription || "Non renseigné"}</p>
        </div>
    );
};

export default VendorDetails;
