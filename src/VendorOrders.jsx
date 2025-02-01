import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser; // Get the logged-in vendor

    useEffect(() => {
        if (!user) return;

        const fetchVendorOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orders"));
                const vendorOrders = [];

                querySnapshot.forEach((docSnap) => {
                    const orderData = docSnap.data();

                    // 🛍️ Filter only items related to this vendor
                    const vendorItems = orderData.items.filter(
                        (item) => item.vendorId === user.uid
                    );

                    if (vendorItems.length > 0) {
                        vendorOrders.push({
                            id: docSnap.id,
                            client: orderData.displayName || "Inconnu",
                            email: orderData.email || "Non spécifié",
                            status: orderData.status || "En Cours de Préparation",
                            total: orderData.total || 0,
                            items: vendorItems, // ✅ Only the vendor's products
                        });
                    }
                });

                setOrders(vendorOrders);
            } catch (error) {
                console.error("❌ Error fetching orders:", error);
            }
            setLoading(false);
        };

        fetchVendorOrders();
    }, [user]);

    const handleUpdateStatus = async (orderId, currentStatus) => {
        if (currentStatus !== "En Cours de Préparation") return;

        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: "Commande Préparée" });

            // 🔄 Update UI immediately
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: "Commande Préparée" } : order
                )
            );

            alert("✅ Commande marquée comme préparée !");
        } catch (error) {
            console.error("❌ Error updating order:", error);
        }
    };

    const statusColors = {
        "En Cours de Préparation": "orange",
        "Commande Préparée": "green",
        "Livré": "blue",
        "Annulé": "gray",
    };

    return (
        <div className="orders-container">
            <h2 className="orders-title">📦 Commandes en Attente</h2>
            <p className="orders-subtitle">{loading ? "Chargement..." : `${orders.length} commandes trouvées`}</p>

            {/* Orders Table */}
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th>Produits</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center">Chargement des commandes...</td>
                        </tr>
                    ) : orders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">Aucune commande trouvée.</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    {order.client}
                                    <br />
                                    <span className="text-gray-500 text-sm">{order.email}</span>
                                </td>
                                <td>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <img src={item.imageURL} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                {item.name} × {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="font-bold">{order.total}€</td>
                                <td>
                                    <span className="status-dot" style={{ backgroundColor: statusColors[order.status] || "blue" }}></span>
                                    {order.status}
                                </td>
                                <td>
                                    {order.status === "En Cours de Préparation" ? (
                                        <button
                                            className="update-status-btn"
                                            onClick={() => handleUpdateStatus(order.id, order.status)}
                                        >
                                            ✅ Marquer comme Préparée
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">✔️ {order.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VendorOrders;
