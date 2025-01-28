import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import "./TasteModal.css"; // Importation du CSS

const INGREDIENTS_LIST = [
  "Fruits de mer",
  "Poisson",
  "Coriandre",
  "Brocoli",
  "Fruits",
  "Oeuf",
  "Alcool",
  "Tomates",
  "Viande rouge",
  "Ail",
  "Fromage",
  "Chocolat",
];

const TasteModal = ({ onClose, onNext, onSave }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  // Filtrage des ingrédients en fonction de la recherche
  const filteredIngredients = INGREDIENTS_LIST.filter((ingredient) =>
    ingredient.toLowerCase().includes(search.toLowerCase())
  );

  // Ajouter ou retirer un ingrédient sélectionné
  const toggleIngredient = (ingredient) => {
    setSelected((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleNext = () => {
    onSave({ dislikedIngredients: selected }); // Transmet les ingrédients sélectionnés au parent
    onNext(); // Passe au modal suivant
  };

  return (
    <ProfileModal
      progress={50}
      title="Vos goûts"
      subtitle="En plus des régimes, y a-t-il des ingrédients que vous n'aimez pas ?"
      onClose={onClose}
      onNext={handleNext}
    >
      {/* Barre de recherche */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un ingrédient"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Liste d'ingrédients */}
      <div className="ingredients-container">
        {filteredIngredients.map((ingredient) => (
          <span
            key={ingredient}
            className={`ingredient-tag ${
              selected.includes(ingredient) ? "selected" : ""
            }`}
            onClick={() => toggleIngredient(ingredient)}
          >
            {ingredient}
          </span>
        ))}
      </div>

      {/* Ingrédients sélectionnés */}
      <div className="selected-tags">
        {selected.map((ingredient) => (
          <span
            key={ingredient}
            className="selected-tag"
            onClick={() => toggleIngredient(ingredient)}
          >
            {ingredient} &times;
          </span>
        ))}
      </div>
    </ProfileModal>
  );
};

export default TasteModal;
