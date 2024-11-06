import React, { useState } from 'react';
// import Navbar from './components/Navbar';
import MenuEntry from './components/MenuEntry'; // Import du composant MenuEntry
import db from './firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import './Products.css';

function Products() {
  const [menuName, setMenuName] = useState('');
  const [meals, setMeals] = useState([{ name: '', ingredients: [''] }]);

  const handleMenuNameChange = (e) => setMenuName(e.target.value);

  const handleMealChange = (index, e) => {
    const { name, value } = e.target;
    const newMeals = [...meals];
    if (name === 'mealName') newMeals[index].name = value;
    else newMeals[index].ingredients = value.split(',').map((ing) => ing.trim());
    setMeals(newMeals);
  };

  const addMeal = () => setMeals([...meals, { name: '', ingredients: [''] }]);
  const removeMeal = (index) => setMeals(meals.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedData = { menuName, meals };
    const menusCollectionRef = collection(db, 'menus');
    const existingMenusSnapshot = await getDocs(menusCollectionRef);

    const menuExists = existingMenusSnapshot.docs.some((doc) => doc.data().menuName === parsedData.menuName);
    if (menuExists) {
      alert('This menu already exists in the database!');
      return;
    }
    const menuDocRef = doc(menusCollectionRef);
    await setDoc(menuDocRef, parsedData);
    alert('Menu successfully added to Firestore!');
    setMenuName('');
    setMeals([{ name: '', ingredients: [''] }]);
  };

  return (
      <div className="left-section p-8">
        <h2 className="text-3xl text-blue-800 mb-6 font-bold">Insert Menus</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-2">Menu Name:</label>
            <input
              type="text"
              value={menuName}
              onChange={handleMenuNameChange}
              required
              className="menu-input p-2 w-full border border-gray-400 rounded-md"
            />
          </div>
          {meals.map((meal, index) => (
            <MenuEntry
              key={index}
              meal={meal}
              index={index}
              onMealChange={handleMealChange}
              onRemoveMeal={removeMeal}
            />
          ))}
          <button type="button" onClick={addMeal} className="button bg-blue-500 text-white px-3 py-2 rounded-md">
            + Add Meal
          </button>
          <button type="submit" className="button bg-green-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
  );
}

export default Products;
