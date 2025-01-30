import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const VendorProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const user = auth.currentUser;
            if (!user) {
                console.error("Utilisateur non connecté");
                return;
            }

            try {
                const q = query(collection(db, "products"), where("vendorId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const productsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsArray);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            <h2 className="title">Mes Produits</h2>
            {loading ? (
                <p className="loading-text">Chargement des produits...</p>
            ) : products.length === 0 ? (
                <p className="no-products">Aucun produit trouvé.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p><strong>Prix :</strong> {product.price}€</p>
                            <p><strong>Catégorie :</strong> {product.category}</p>
                            <p><strong>Description :</strong> {product.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorProductList;
