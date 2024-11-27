import React from 'react';
import VendorCard from './components/VendorCard';

export default function VendorList() {
  const vendors = [
    {
      image: 'https://via.placeholder.com/150',
      name: 'Boulangerie Saint-Jean',
      details: {
        '📍 Adresse': '12 Rue Saint-Jean, Caen, 14000',
        '🌟 Spécialité': 'Pains artisanaux et viennoiseries maison',
        '📞 Contact': '02 31 45 67 89',
        '🕒 Horaires': '6h - 20h (Lun-Sam)',
      },
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Fromagerie Normande',
      details: {
        '📍 Adresse': '8 Rue Froide, Caen, 14000',
        '🌟 Spécialité': 'Fromages de Normandie et produits laitiers',
        '📞 Contact': '02 31 90 12 34',
        '🕒 Horaires': '9h - 19h (Mar-Sam)',
      },
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Café des Arts',
      details: {
        '📍 Adresse': '5 Place de la République, Caen, 14000',
        '🌟 Spécialité': 'Cafés, thés et pâtisseries maison',
        '📞 Contact': '02 31 88 76 54',
        '🕒 Horaires': '8h - 18h (Tous les jours)',
      },
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Marché Bio de Caen',
      details: {
        '📍 Adresse': '22 Avenue de la Libération, Caen, 14000',
        '🌟 Spécialité': 'Fruits et légumes biologiques locaux',
        '📞 Contact': '02 31 77 65 43',
        '🕒 Horaires': '9h - 19h (Mar-Sam)',
      },
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Poissonnerie Marine',
      details: {
        '📍 Adresse': '18 Quai Vendeuvre, Caen, 14000',
        '🌟 Spécialité': 'Produits de la mer frais et locaux',
        '📞 Contact': '02 31 22 33 44',
        '🕒 Horaires': '8h - 13h (Mar-Dim)',
      },
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Pizzeria Bella Roma',
      details: {
        '📍 Adresse': '14 Rue de Bayeux, Caen, 14000',
        '🌟 Spécialité': 'Pizzas au feu de bois et cuisine italienne',
        '📞 Contact': '02 31 55 66 77',
        '🕒 Horaires': '12h - 22h (Mar-Dim)',
      },
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {vendors.map((vendor, index) => (
          <VendorCard
            key={index}
            image={vendor.image}
            name={vendor.name}
            details={vendor.details}
          />
        ))}
      </div>
    </div>
  );
}
