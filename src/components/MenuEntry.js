// src/components/MenuEntry.js
import React from 'react';

function MenuEntry({ meal, index, onMealChange, onRemoveMeal }) {
  const handleChange = (e) => {
    onMealChange(index, e); // Appelle la fonction de gestion de changement passée en prop
  };

  return (
    <div className="meal-container bg-gray-100 p-4 rounded-lg">
      <label className="block text-md font-semibold mb-2">Meal Name:</label>
      <input
        type="text"
        name="mealName"
        value={meal.name}
        onChange={handleChange}
        required
        className="meal-input p-2 w-full border border-gray-400 rounded-md mb-3"
      />
      <label className="block text-md font-semibold mb-2">Ingredients (comma-separated):</label>
      <input
        type="text"
        name="ingredients"
        value={meal.ingredients.join(', ')}
        onChange={handleChange}
        required
        className="meal-input p-2 w-full border border-gray-400 rounded-md"
      />
      <button
        type="button"
        onClick={() => onRemoveMeal(index)}
        className="button bg-red-500 text-white px-3 py-2 rounded-md mt-2"
      >
        Remove Meal
      </button>
    </div>
  );
}

export default MenuEntry;
