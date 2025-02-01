import React, {useState} from "react";
import {db, auth} from "../firebaseConfig";
import {doc, getDoc, setDoc, collection, query, where, getDocs} from "firebase/firestore";
import "./SubCard.css";





function printStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);           
    const fractionalPart = rating - fullStars;      
    const emptyStars = 5 - fullStars - (fractionalPart > 0 ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg key={`full-${i}`} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        );
    }

    // Add a fractional star if needed
    if (fractionalPart > 0) {
        stars.push(
            <svg key="fractional" className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                <defs>
                    <linearGradient id="fractionalStarGradient">
                        <stop offset={`${fractionalPart * 100}%`} stopColor="currentColor" />
                        <stop offset={`${fractionalPart * 100}%`} stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" fill="url(#fractionalStarGradient)" />
            </svg>
        );
    }

    if (emptyStars !== 0) {
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }
    }

    return <>{stars}</>;
}



function SubCard({ title, image, rating, price, large, disabled }) {
    const disabledClass = disabled ? "disabled" : "";
    const [showModal, setShowModal] = useState(false);

    const handleAddToCart = async () => {
        const user = auth.currentUser; // Get the logged-in user
    
        if (!user) {
            alert("Vous devez être connecté pour ajouter au panier !");
            return;
        }
    
        try {
            // 🔥 Fetch all products from Firestore
            const productsRef = collection(db, "products");
            const productSnap = await getDocs(productsRef);
    
            if (!productSnap.empty) {
                const allProducts = productSnap.docs.map(doc => ({
                    ...doc.data(), // Include product details
                    quantity: 1,   // Default quantity
                }));
    
                const cartRef = doc(db, "cart", user.uid); // User's cart in Firestore
                const cartSnap = await getDoc(cartRef);
    
                let cartItems = [];
                if (cartSnap.exists()) {
                    cartItems = cartSnap.data().items || [];
                }
    
                // Merge new products with existing cart items (avoid duplicates)
                allProducts.forEach((product) => {
                    const existingItem = cartItems.find(item => item.name === product.name);
                    if (existingItem) {
                        existingItem.quantity += 1; // Increase quantity if already in cart
                    } else {
                        cartItems.push(product); // Add new product
                    }
                });
    
                // 🔥 Update Firestore with the updated cart
                await setDoc(cartRef, {
                    email: user.email,
                    displayName: user.displayName || "Utilisateur",
                    items: cartItems, // Store updated cart
                });
    
                setShowModal(true);
            } else {
                console.error("❌ Aucun produit trouvé dans la base de données.");
            }
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout au panier :", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className={`sub-card 
            ${large ? "large" : ""}
            ${!large && disabledClass === "disabled" ? "disabled" : ""}
             max-w-sm bg-customRed border border-gray-200 rounded-lg shadow 
            ${large ? "scale-100 shadow-lg border-customRed-500" : ""}`}>
            <img className="p-8 rounded-t-lg" src={image} alt="product" />
            <div className="px-5 pb-5">
                <div>
                    <h5 className="title text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {printStars(rating)}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rating}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="price text-3xl font-bold text-gray-900 dark:text-white">{price}/mois</span>
                    <button
                        className={`add-to-cart text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                ${disabledClass === "disabled" ? "bg-gray-400 cursor-not-allowed" : "bg-customBlue hover:bg-customBlue-dark focus:ring-4 focus:outline-none focus:ring-customBlue-light"}`}
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-lg text-center font-semibold text-customBlue">Article ajouté au panier</p>
                    <button 
                    onClick={closeModal} 
                    className="mt-4 px-6 py-2 bg-customBlue hover:bg-customRed text-white font-semibold rounded-md"
                    >
                    Fermer
                    </button>
                </div>
                </div>
            )}
        </div>
        
    );
}

export default SubCard;