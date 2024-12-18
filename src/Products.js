import React, { useState } from 'react';
import MenuEntry from './components/MenuEntry'; // Import du composant MenuEntry
import db from './firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import './Products.css';

function Products() {
  const [menuName, setMenuName] = useState('');
  const [meals, setMeals] = useState([{ name: '', ingredients: [''] }]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = process.env.REACT_APP_PASSWORD;

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleMenuNameChange = (e) => setMenuName(e.target.value);

  const handleMealChange = (index, e) => {
    const { name, value } = e.target;
    const newMeals = [...meals];
  
    if (name === 'mealName') {
      newMeals[index].name = value;
    } else if (name === 'ingredients') {
      // Ensure ingredients is always an array
      newMeals[index].ingredients = value.split(',').map((ing) => ing.trim());
    }
  
    setMeals(newMeals);
  };
  

  const addMeal = () => setMeals([...meals, { name: '', ingredients: [''] }]);
  const removeMeal = (index) => setMeals(meals.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedData = { menuName, meals };
  
    // Ensure all meals have an array for ingredients before joining
    parsedData.meals = parsedData.meals.map(meal => ({
      ...meal,
      ingredients: Array.isArray(meal.ingredients) ? meal.ingredients : meal.ingredients.split(',').map(i => i.trim())
    }));
  
    const menusCollectionRef = collection(db, 'menus');
    const existingMenusSnapshot = await getDocs(menusCollectionRef);
  
    const menuExists = existingMenusSnapshot.docs.some((doc) => doc.data().menuName === parsedData.menuName);
    if (menuExists) {
      alert('This menu already exists in the database!');
      return;
    }
  
    const menuDocRef = doc(menusCollectionRef);
    await setDoc(menuDocRef, parsedData);
    alert('Menu successfully added to the database!');
    setMenuName('');
    setMeals([{ name: '', ingredients: [''] }]);
  };
  

  if (!isAuthenticated) {
    return (

      <div className="flex flex-col min-h-screen">
        <div className="authentication-container">
          <h2 className="text-3xl text-customBlue mb-6 font-bold text-center">Enter Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="flex justify-center"> 
              <label className="block text-lg font-semibold mb-2 mr-2">Password:</label> 
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="menu-input p-2 w-1/2 border border-gray-400 rounded-md"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center"> {/* Center the submit button */}
              <button type="submit" className="button bg-blue-500 text-white px-3 py-2 rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
    
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
    </div>
  );
}

export default Products;
