import React, { useState, useRef} from 'react';
import debounce from 'lodash.debounce';
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  

  const formatSuggestion = (suggestion) => {
    const { address } = suggestion;
    const city = address.city || address.town || address.village || address.hamlet || '';
    const postcode = address.postcode || '';
    const country = address.country || '';

    // Retourner uniquement si le code postal est présent
    if (city && postcode && country) {
      return `${city}, ${postcode}, ${country}`;
    }

    return null; // Exclure les suggestions incomplètes
  };

  const normalizeString = (str) => {
    return str
      .normalize("NFD") // Décompose les caractères en leurs éléments de base et les marques diacritiques
      .replace(/[\u0300-\u036f]/g, "") // Supprime les marques diacritiques
      .toLowerCase() // Convertit en minuscules
      .replace(/[^a-z0-9 ]/g, ""); // Supprime les caractères spéciaux sauf les espaces
  };

  

  // Fonction pour récupérer les suggestions via l'API OpenStreetMap
  const fetchSuggestions = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&accept-language=fr`,
        {
          headers: {
            'Accept-Language': 'fr',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();

      const formattedSuggestions = data
        .map((suggestion) => ({
          ...suggestion,
          formatted: formatSuggestion(suggestion),
        }))
        .filter((suggestion) => suggestion.formatted !== null);

      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      setError('Impossible de récupérer les suggestions. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Utiliser useCallback pour mémoriser la fonction debounced
  const debouncedFetchSuggestions = useRef(
    debounce((searchQuery) => {
      fetchSuggestions(searchQuery);
    }, 300)
  ).current;

  const handleInputChange = (e) => {
  const newQuery = e.target.value;
  setQuery(newQuery);
  setIsSuggestionSelected(false);

  // Normaliser la requête pour ignorer les accents et les majuscules
  const normalizedQuery = normalizeString(newQuery);

  // Appeler l'API si la recherche dépasse 2 caractères
  if (normalizedQuery.length > 2) {
    debouncedFetchSuggestions(normalizedQuery);
  } else {
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
  }
};

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.formatted);
    setSuggestions([]);
    setIsSuggestionSelected(true);
    if (onSearch) {
      onSearch(suggestion.formatted);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    
    setSuggestions([]);
  };

  

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Faites votre recherche ici..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button" disabled={!isSuggestionSelected}>
        GO
      </button>
      {isLoading && <div className="loading-indicator">Chargement...</div>}
      {error && <div className="error-message">{error}</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
        <li
          key={suggestion.place_id}
          onClick={() => handleSuggestionClick(suggestion)}
          className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
          role="option"
          id={`suggestion-${index}`}
          aria-selected={index === activeSuggestionIndex}
        >
          {suggestion.formatted}
        </li>
      ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
