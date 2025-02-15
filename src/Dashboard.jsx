import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, query, getDocs} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from './firebaseConfig';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SideNavbar from "./components/SideNavbarClient";
import Card from "./components/Card";
import ProductCard from "./components/ProductCard";
import product_icon from "./assets/icons/cook.svg";
import delivery_icon from "./assets/icons/delivery.svg";
import profile_icon from "./assets/icons/user.svg";


export default function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const cookie = Cookies.get('auth_token');
        if (!cookie) {
            navigate('/profile');
        }
    }, [navigate]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userRef);
    
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().displayName || "cher utilisateur");
                        setIsAdmin(userDoc.data().isAdmin || false);
                    }
    
                    // 🔥 Fetch vendor's products
                    const productsRef = collection(db, "products");
                    const q = query(productsRef);
                    const querySnapshot = await getDocs(q);
    
                    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    
                } catch (error) {
                    console.error("❌ Error fetching data:", error);
                }
            } else {
                navigate('/profile');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="flex flex-col md:flex-row">
            {isAdmin && <SideNavbar />}
            <div className="flex-1 p-4 md:p-6">
                <div className="flex flex-col gap-y-4 md:gap-y-6">
                    <div>
                        <div className="flex flex-row items-center">
                            <h1 className="inline-block text-xl md:text-2xl font-bold">Bienvenue</h1>
                            <h1 className="inline-block text-xl md:text-2xl text-customRed font-bold pl-2">
                                {loading ? (
                                    <span className="animate-pulse bg-gray-300 h-6 w-32 inline-block align-middle"></span>
                                ) : (
                                    userName
                                )}
                            </h1>
                        </div>
                        <p className="text-customBlue text-sm md:text-base">
                            Vous pouvez gérer votre profil et suivre vos commandes depuis cette page.
                        </p>
                    </div>

                    {/* Cards en grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <Card title={"Produits"} text1={"Gérez vos produits disponibles à la vente"} text2={"Voir les produits"} icon={product_icon} link={"/dashboard"}/>
                        <Card title={"Commandes"} text1={"Suivez les commandes passées par les clients"} text2={"Voir les commandes"} icon={delivery_icon} link={"/dashboard"}/>
                        <Card title={"Profil"} text1={"Mettez à jour vos informations de profil"} text2={"Voir le profil"} icon={profile_icon} link={"/userProfile"}/>
                    </div>

                </div>
            </div>
        </div>
    );
}
