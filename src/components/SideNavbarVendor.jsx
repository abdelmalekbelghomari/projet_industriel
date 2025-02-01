import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SideNavbarVendor() {
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
                        to="/vendor/registration"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Inscription
                    </Link>
                </li>
                <li>
                    <Link
                        to="/vendor/products"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Gestion des produits
                    </Link>
                </li>
                <li>
                    <Link
                        to="/vendor/my-products"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Mes Produits
                    </Link>
                </li>
                <li>
                    <Link
                        to="/vendor/orders"
                        className="block py-3 px-6 hover:text-customRed rounded-md"
                    >
                        Commandes reçues
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
