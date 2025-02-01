import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import ProductCard from "./components/ProductCard";

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
            {/* Titre des produits */}
            <div className="text-xl font-bold">Vos Produits</div>

            {/* ProductCards en grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard 
                            key={product.id}
                            title={product.name} 
                            text1={product.description} 
                            text2={"Modifier"} 
                            price={`${product.price}€`} 
                            image={product.imageURL || "https://via.placeholder.com/150"}  
                            link={"/dashboard"} 
                        />
                    ))
                ) : (
                    <p className="text-gray-500">Aucun produit disponible.</p>
                )}
            </div>
        </div>
    );
};

export default VendorProductList;
