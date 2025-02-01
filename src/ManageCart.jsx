import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const ManageCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [orders, setOrders] = useState([]); // 🆕 Store user's past orders

    useEffect(() => {
        const fetchCart = async () => {
            const user = auth.currentUser;
            if (!user) {
                console.error("❌ No authenticated user.");
                setLoading(false);
                return;
            }

            try {
                const cartRef = doc(db, "cart", user.uid);
                const cartSnap = await getDoc(cartRef);

                if (cartSnap.exists()) {
                    const cartData = cartSnap.data().items || [];
                    setCartItems(cartData);

                    // 🔥 Calculate total price
                    const total = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    setTotalPrice(total);
                } else {
                    console.log("🛒 Cart is empty.");
                }
            } catch (error) {
                console.error("❌ Error fetching cart:", error);
            }

            setLoading(false);
        };

        const fetchOrders = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const ordersRef = collection(db, "orders");
                const ordersSnap = await getDocs(ordersRef);
                const userOrders = ordersSnap.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(order => order.email === user.email); // ✅ Filter user's orders

                setOrders(userOrders);
            } catch (error) {
                console.error("❌ Error fetching orders:", error);
            }
        };

        fetchCart();
        fetchOrders();
    }, []);

    const handleOrder = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            // 1️⃣ Move cart items to "orders"
            const orderRef = doc(db, "orders", user.uid);
            await setDoc(orderRef, {
                email: user.email,
                displayName: user.displayName || "Utilisateur",
                items: cartItems,
                total: totalPrice,
                status: "En Cours de Préparation",
                createdAt: new Date(),
            });

            // 2️⃣ Clear the cart in Firestore
            await deleteDoc(doc(db, "cart", user.uid));

            // 3️⃣ Clear local state
            setCartItems([]);
            setTotalPrice(0);

            // 4️⃣ Show success message
            setSuccessMessage("✅ Commande envoyée !");
            setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3s
        } catch (error) {
            console.error("❌ Erreur lors de la commande :", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-customRed mb-4">🛒 Votre Panier</h2>

            {successMessage && <p className="text-green-500 font-semibold">{successMessage}</p>}

            {loading ? (
                <p className="text-gray-600">Chargement...</p>
            ) : cartItems.length === 0 ? (
                <p className="text-gray-600">Votre panier est vide.</p>
            ) : (
                <div>
                    {/* 🛍️ List of Cart Items */}
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b py-2">
                                <div className="flex items-center gap-4">
                                    <img src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div>
                                        <p className="text-lg font-semibold">{item.name}</p>
                                        <p className="text-gray-600">{item.quantity} × {item.price}€</p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-customBlue">{(item.price * item.quantity).toFixed(2)}€</p>
                            </div>
                        ))}
                    </div>

                    {/* 💰 Total Price */}
                    <div className="mt-6 text-xl font-bold text-gray-800 flex justify-between">
                        <span>Total:</span>
                        <span className="text-customRed">{totalPrice.toFixed(2)}€</span>
                    </div>

                    {/* 🚀 Commander Button */}
                    <button 
                        onClick={handleOrder}
                        className="mt-6 w-full bg-customBlue hover:bg-customRed text-white py-3 rounded-md text-lg font-semibold transition"
                    >
                        Commander
                    </button>
                </div>
            )}

            {/* 🆕 Mes Commandes Section */}
            <h2 className="text-2xl font-bold text-customRed mt-8">📦 Mes Commandes</h2>

            {orders.length === 0 ? (
                <p className="text-gray-600">Vous n'avez pas encore de commandes.</p>
            ) : (
                <div className="mt-4">
                    {orders.map((order, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-100 mb-4">
                            <p className="text-lg font-semibold">Commande #{order.id}</p>
                            <p className="text-sm text-gray-600">Total: <span className="font-bold">{order.total}€</span></p>
                            <p className="text-sm text-gray-600">
                                Status: <span className={`font-bold ${order.status === "Livrée" ? "text-green-500" : "text-orange-500"}`}>
                                    {order.status}
                                </span>
                            </p>
                            <ul className="mt-2 text-sm text-gray-700">
                                {order.items.map((item, idx) => (
                                    <li key={idx}>✅ {item.quantity} × {item.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageCart;
