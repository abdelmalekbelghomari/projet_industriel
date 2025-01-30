import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const VendorProductManagement = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user) {
            alert("Utilisateur non authentifié !");
            return;
        }

        try {
            const productData = {
                vendorId: user.uid,
                vendorEmail: user.email,
                name: productName,
                price: parseFloat(productPrice),
                category: productCategory,
                description: productDescription,
                createdAt: new Date(),
            };

            await addDoc(collection(db, "products"), productData);
            setSuccessMessage("Produit ajouté avec succès !");
            setProductName("");
            setProductPrice("");
            setProductCategory("");
            setProductDescription("");
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit:", error);
        }
    };

    return (
        <div className="product-management-container">
            <h2 className="text-customRed text-2xl mb-4">Ajouter un produit</h2>
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Nom du produit:</label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Prix (en €):</label>
                    <input 
                        type="number" 
                        value={productPrice} 
                        onChange={(e) => setProductPrice(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Catégorie:</label>
                    <input 
                        type="text" 
                        value={productCategory} 
                        onChange={(e) => setProductCategory(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        value={productDescription} 
                        onChange={(e) => setProductDescription(e.target.value)} 
                        className="form-input"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Ajouter le produit
                </button>
            </form>
        </div>
    );
};

export default VendorProductManagement;
