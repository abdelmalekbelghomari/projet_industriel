import React, { useState } from 'react';
import db from './firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import './Products.css';

function Products() {
  const [menuName, setMenuName] = useState('');
  const [meals, setMeals] = useState([{ name: '', ingredients: [''] }]);
  const [menuCounter, setMenuCounter] = useState(1); // Initialize menu counter

  // Handle menu name change
  const handleMenuNameChange = (e) => {
    setMenuName(e.target.value);
  };

  // Handle meal change
  const handleMealChange = (index, e) => {
    const { name, value } = e.target;
    const newMeals = [...meals];
    if (name === 'mealName') {
      newMeals[index].name = value;
    } else {
      newMeals[index].ingredients = value.split(',').map((ing) => ing.trim());
    }
    setMeals(newMeals);
  };

  // Handle adding a new meal
  const addMeal = () => {
    setMeals([...meals, { name: '', ingredients: [''] }]);
  };

  // Handle removing a meal
  const removeMeal = (index) => {
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setMeals(newMeals);
  };

  // Handle JSON injection to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedData = {
        menuName: menuName,
        meals: meals,
      };

      // Check if the menu already exists
      const menusCollectionRef = collection(db, 'menus');
      const existingMenusSnapshot = await getDocs(menusCollectionRef);
      let menuExists = false;

      existingMenusSnapshot.forEach((doc) => {
        const existingMenu = doc.data();
        if (existingMenu.menuName === parsedData.menuName) {
          menuExists = true; // Assuming menu name uniqueness
        }
      });

      if (menuExists) {
        alert('This menu already exists in the database!');
        return; // Exit the function if the menu exists
      }

      // Set document with the parsed data
      const menuDocRef = doc(menusCollectionRef, `menu${menuCounter}`);
      await setDoc(menuDocRef, parsedData);
      alert('Menu successfully added to Firestore!');

      // Increment the counter after successful addition
      setMenuCounter(menuCounter + 1);
      setMenuName(''); // Clear menu name
      setMeals([{ name: '', ingredients: [''] }]); // Reset meals array
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding menu data. Ensure your JSON is correct.');
    }
  };

  return (
    <div>
      <h2>Insert Menus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Menu Name:</label>
          <input
            type="text"
            value={menuName}
            onChange={handleMenuNameChange}
            required
            className='menu-input'
          />
        </div>

        {meals.map((meal, index) => (
        <div key={index} className="meal-container">
            <label>Meal Name:</label>
            <input
                type="text"
                name="mealName"
                value={meal.name}
                onChange={(e) => handleMealChange(index, e)}
                required
                className="meal-input"
            />
            <label>Ingredients (comma-separated):</label>
            <input
                type="text"
                name="ingredients"
                value={meal.ingredients.join(', ')} 
                onChange={(e) => handleMealChange(index, e)}
                required
                className="meal-input" 
            />
            <button type="button" onClick={() => removeMeal(index)} className="button">
            Remove Meal
            </button>
            
        </div>
        ))}
        <button type="button" onClick={addMeal} className='button'> + </button> <br />
        <button type="submit" className='button'>Submit</button>
      </form>
    </div>
  );
}

export default Products;
