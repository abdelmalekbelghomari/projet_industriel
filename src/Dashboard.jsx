import React from "react";
import SideNavbar from "./components/SideNavbar";
import Card from "./components/Card";
import product_icon from "./assets/icons/cook.svg";

export default function Dashboard() {
    return (
        <div className="flex flex-col md:flex-row">
            <SideNavbar />
            <div className="flex-1 p-4 md:p-6">
                <div className="flex flex-col gap-y-4 md:gap-y-6">
                    <div>
                        <h1 className="inline-block text-xl md:text-2xl font-bold">Bienvenue</h1>
                        <h1 className="inline-block text-xl md:text-2xl text-customRed font-bold pl-2">John Doe</h1>
                        <p className="text-customBlue text-sm md:text-base">Vous pouvez gérer votre profil et suivre vos commandes depuis cette page</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-x-20">
                        <Card title={"Produits"} text1={"Gérez vos produits disponibles à la vente"} text2={"Voir les produits"} icon={product_icon} link={"/dashboard"}/>
                        <Card title={"Commandes"} text1={"Suivez les commandes passées par les clients"} text2={"Voir les commandes"} icon={product_icon} link={"/dashboard"}/>
                        <Card title={"Profil"} text1={"Mettez à jour vos informations de profil"} text2={"Voir le profil"} icon={product_icon} link={"/dashboard"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}