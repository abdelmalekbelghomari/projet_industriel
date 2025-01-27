import React from "react";
import { Link } from "react-router-dom";

export default function SideNavbar() {
    return (
        <div className="mt-auto w-64 bg-customBlue text-white left-0 pb-3 rounded-tr-lg rounded-br-lg">
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
                        to="/dashboard"
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
                        Commande
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Statistique
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
            </ul>
        </div>
    );
}
