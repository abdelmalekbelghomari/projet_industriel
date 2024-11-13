// SearchBox.js
import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Faites votre recherche ici..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>GO</button>
    </div>
  );
};

export default SearchBox;