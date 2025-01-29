import React, { useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from './firebaseConfig';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SideNavbar from "./components/SideNavbar";
import Card from "./components/Card";
import ProductCard from "./components/ProductCard";
import product_icon from "./assets/icons/cook.svg";
import delivery_icon from "./assets/icons/delivery.svg";
import profile_icon from "./assets/icons/user.svg";
import pain_naan from "./assets/images/pain_naan.jpg";
import legumes from "./assets/images/legumes_saison.jpeg";
import fromage from "./assets/images/plateau_fromage.png";
import saumon from "./assets/images/filet-de-saumon.jpg";
import tournedos from "./assets/images/tournedos.jpg";
import hlib from "./assets/images/lait.png";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

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
                        const userData = userDoc.data();
                        setUserName(userData.displayName || "cher utilisateur");
                        setIsAdmin(userData.isAdmin || false);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des données utilisateur :", error.message);
                }
            } else {
                console.error("Aucun utilisateur connecté.");
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
                        <Card title={"Produits"} text1={"Gérez vos produits disponibles à la vente"} text2={"Voir les produits"} icon={product_icon} link={"/dashboard"} />
                        <Card title={"Commandes"} text1={"Suivez les commandes passées par les clients"} text2={"Voir les commandes"} icon={delivery_icon} link={"/dashboard"} />
                        <Card title={"Profil"} text1={"Mettez à jour vos informations de profil"} text2={"Voir le profil"} icon={profile_icon} link={"/dashboard"} />
                    </div>

                    {/* Titre des produits */}
                    <div className="text-xl font-bold">Vos Produits</div>

                    {/* ProductCards en grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <ProductCard title={"Pain Naan"} text1={"Pain artisanal originaire d'Asie du Sud"} text2={"Modifier"} price={"3€55"} image={pain_naan} link={"/dashboard"} />
                        <ProductCard title={"Légumes de saison"} text1={"Panier de légumes de saisons de la région"} text2={"Modifier"} price={"5€38"} image={legumes} link={"/dashboard"} />
                        <ProductCard title={"Plateau de fromages"} text1={"Plateau de fromages de terroirs"} text2={"Modifier"} price={"9€20"} image={fromage} link={"/dashboard"} />
                        <ProductCard title={"Filets de Saumon"} text1={"3 filets de saumon sauvage péché en Atlantique Nord"} text2={"Modifier"} price={"9€00"} image={saumon} link={"/dashboard"} />
                        <ProductCard title={"Tournedos d'agneau"} text1={"2 tournedos d'agneau préparés par votre boucher"} text2={"Modifier"} price={"7€50"} image={tournedos} link={"/dashboard"} />
                        <ProductCard title={"Bouteilles de lait"} text1={"Lait de vache demi-écrémé"} text2={"Modifier"} price={"1€30"} image={hlib} link={"/dashboard"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
