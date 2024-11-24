import React, { useEffect, useState, useRef } from 'react';
import './PartnersSection.css';
import PartnerCard from './PartnerCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const PartnersSection = ({ cityQuery }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  // Sample partners data
  const partners = [
        {
                image: 'https://via.placeholder.com/150',
                name: 'Boulangerie Saint-Jean',
                description: {
                  '📍 Adresse': '12 Rue Saint-Jean, Caen, 14000',
                  '🌟 Spécialité': 'Pains artisanaux et viennoiseries maison',
                  '📞 Contact': '02 31 45 67 89',
                  '🕒 Horaires': '6h - 20h (Lun-Sam)',
                },
              },
              {
                image: 'https://via.placeholder.com/150',
                name: 'Fromagerie Normande',
                description: {
                  '📍 Adresse': '8 Rue Froide, Caen, 14000',
                  '🌟 Spécialité': 'Fromages de Normandie et produits laitiers',
                  '📞 Contact': '02 31 90 12 34',
                  '🕒 Horaires': '9h - 19h (Mar-Sam)',
                },
              },
              {
                image: 'https://via.placeholder.com/150',
                name: 'Café des Arts',
                description: {
                  '📍 Adresse': '5 Place de la République, Caen, 14000',
                  '🌟 Spécialité': 'Cafés, thés et pâtisseries maison',
                  '📞 Contact': '02 31 88 76 54',
                  '🕒 Horaires': '8h - 18h (Tous les jours)',
                },
              },
              {
                image: 'https://via.placeholder.com/150',
                name: 'Marché Bio de Caen',
                description: {
                  '📍 Adresse': '22 Avenue de la Libération, Caen, 14000',
                  '🌟 Spécialité': 'Fruits et légumes biologiques locaux',
                  '📞 Contact': '02 31 77 65 43',
                  '🕒 Horaires': '9h - 19h (Mar-Sam)',
                },
              },
              {
                image: 'https://via.placeholder.com/150',
                name: 'Poissonnerie Marine',
                description: {
                  '📍 Adresse': '18 Quai Vendeuvre, Caen, 14000',
                  '🌟 Spécialité': 'Produits de la mer frais et locaux',
                  '📞 Contact': '02 31 22 33 44',
                  '🕒 Horaires': '8h - 13h (Mar-Dim)',
                },
              },
              {
                image: 'https://via.placeholder.com/150',
                name: 'Pizzeria Bella Roma',
                description: {
                  '📍 Adresse': '14 Rue de Bayeux, Caen, 14000',
                  '🌟 Spécialité': 'Pizzas au feu de bois et cuisine italienne',
                  '📞 Contact': '02 31 55 66 77',
                  '🕒 Horaires': '12h - 22h (Mar-Dim)',
                },
              }
            ];

  // Function to fetch city coordinates
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityQuery)}&format=json`
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
        } else {
          setError('Aucune donnée trouvée pour cette ville.');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (cityQuery) {
      fetchCoordinates();
    }
  }, [cityQuery]);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust to match the card width
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust to match the card width
      behavior: 'smooth',
    });
  };

  return (
    <div className="partners-section">
      <h2>Carte de la ville : {cityQuery}</h2>
      <div className="map-container">
        {error && <p className="error-message">{error}</p>}
        {coordinates ? (
          <MapContainer
            center={[coordinates.lat, coordinates.lon]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker position={[coordinates.lat, coordinates.lon]}>
              <Popup>{cityQuery}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          !error && <p>Chargement de la carte...</p>
        )}
      </div>

      <div className="scroll-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>
          &#8249; {/* Left arrow */}
        </button>
        <div className="partners-scroll-container" ref={scrollContainerRef}>
          {partners.map((partner, index) => (
            <PartnerCard
              key={index}
              image={partner.image}
              name={partner.name}
              details={partner.description}
            />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          &#8250; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default PartnersSection;
