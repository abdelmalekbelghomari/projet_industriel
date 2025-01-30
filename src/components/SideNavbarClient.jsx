import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SideNavbarClient() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('auth_token');
        navigate('/profile');
    };

    return (
        <div className="mb-auto w-64 bg-customBlue text-white left-0 pb-3 rounded-br-3xl">
            <ul className="flex flex-col mt-4 space-y-2">
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Tableau de bord
                    </Link>
                </li>
                <li>
                    <Link
                        to="/work/gestion-utilisateurs"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Gestion des utilisateurs
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Commandes
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Statistiques
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Commerçants
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Paiements
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Supports client
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Stock
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Configurations du site
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="block py-3 px-6 hover:text-customRed rounded-md">
                        Deconnexion
                    </button>
                </li>
            </ul>
        </div>
    );
}
