// src/components/MenuCard.js
import React from 'react';

function MenuCard({ menu }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-sm border border-gray-300">
      <h2 className="text-xl font-semibold text-customBlue mb-4">{menu.menuName}</h2>
      {menu.meals.map((meal, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-medium text-customRed">{meal.name}</h3>
          <p className="text-customBlue text-sm">
            Ingredients: {meal.ingredients.join(', ')}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MenuCard;
