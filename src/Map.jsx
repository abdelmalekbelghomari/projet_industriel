import React, { useRef, useState } from 'react';
import SearchBox from './components/SearchBox';
import PartnersSection from './components/PartnersSection';

function Map({setCityQuery}){
  const [showPartners, setShowPartners] = useState(false);
  const partnersRef = useRef(null);

  const handleSearch = (searchQuery) => {
    setCityQuery(searchQuery);
    setShowPartners(true);
    if (partnersRef.current) {
      partnersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="content-container">
      <div className="main-section">
        <h1>Découvrez si nous livrons chez vous</h1>
        <SearchBox onSearch={handleSearch} />
        <p>Nous livrons tous les jours les quartiers de nombreuses villes en France.</p>
      </div>
      {showPartners && <div ref={partnersRef}><PartnersSection cityQuery={setCityQuery} /></div>}
    </div>
  );
};

export default Map;
