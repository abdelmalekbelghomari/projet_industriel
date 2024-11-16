import React from 'react';
import Avatar from '../assets/icons/man.png';

export default function VendorCard() {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Nos Partenaires Locaux
        </h1>
  
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Vendor 1 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              {/* Vendor Image */}
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Vendor Logo"
                  className="rounded-full"
                />
              </div>
              {/* Vendor Name */}
              <h2 className="text-xl font-semibold">La Glace Artisanale</h2>
            </div>
            <hr className="my-4" />
            {/* Vendor Details */}
            <ul className="text-sm space-y-2">
              <li>📍 12 Rue des Délices, Marseille, 13001</li>
              <li>🌟 Spécialité : Glaces et sorbets faits maison</li>
              <li>📞 Contact : 04 91 23 45 67</li>
              <li>🕒 Horaires : 10h - 19h (Mar-Dim)</li>
            </ul>
          </div>
  
          {/* Vendor 2 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              {/* Vendor Image */}
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Vendor Logo"
                  className="rounded-full"
                />
              </div>
              {/* Vendor Name */}
              <h2 className="text-xl font-semibold">Boulangerie du Coin</h2>
            </div>
            <hr className="my-4" />
            {/* Vendor Details */}
            <ul className="text-sm space-y-2">
              <li>📍 18 Place du Marché, Lyon, 69000</li>
              <li>🌟 Spécialité : Pain bio et viennoiseries</li>
              <li>📞 Contact : 04 78 90 12 34</li>
              <li>🕒 Horaires : 7h - 20h (Lun-Sam)</li>
            </ul>
          </div>

           {/* Vendor 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
                {/* Vendor Image */}
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Vendor Logo"
                    className="rounded-full"
                />
                </div>
                {/* Vendor Name */}
                <h2 className="text-xl font-semibold">Fromagerie du Terroir</h2>
            </div>
            <hr className="my-4" />
            {/* Vendor Details */}
            <ul className="text-sm space-y-2">
                <li>📍 45 Rue des Saveurs, Annecy, 74000</li>
                <li>🌟 Spécialité : Fromages artisanaux et produits locaux</li>
                <li>📞 Contact : 04 50 12 34 56</li>
                <li>🕒 Horaires : 9h - 18h (Mar-Sam)</li>
            </ul>
            </div>

            {/* Vendor 4 */}
            <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
                {/* Vendor Image */}
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Vendor Logo"
                    className="rounded-full"
                />
                </div>
                {/* Vendor Name */}
                <h2 className="text-xl font-semibold">Épicerie Bio du Village</h2>
            </div>
            <hr className="my-4" />
            {/* Vendor Details */}
            <ul className="text-sm space-y-2">
                <li>📍 10 Avenue Verte, Grenoble, 38000</li>
                <li>🌟 Spécialité : Fruits, légumes et produits bio</li>
                <li>📞 Contact : 04 76 78 12 34</li>
                <li>🕒 Horaires : 8h - 19h (Lun-Sam)</li>
            </ul>
            </div>
        </div>
      </div>
    );
  }
  
  