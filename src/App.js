import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import db from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import necessary Firestore functions
import Products from './Products';
import GroceriesImage from './assets/images/groceries.png';
import './App.css';

function App() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusCollection = collection(db, 'menus');
        const menusSnapshot = await getDocs(menusCollection);
    
        const menusList = menusSnapshot.docs.map((doc) => ({
          id: doc.id,
          menuName: doc.data().menuName,
          meals: doc.data().menu || [],
        }));
    
        console.log('Fetched menus:', menusList); // Log the fetched menus
        setMenus(menusList);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchMenus(); // Call the function to fetch menus
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          {/* Left section (White background) */}
          <div className="left-section">
            <h1>Découvrez si nous livrons chez vous</h1>
            <div className="search-box">
              <input type="text" placeholder="Faites votre recherche ici..." />
              <button>GO</button>
            </div>
            <p>Nous livrons tous les jours les quartiers de nombreuses villes en France.</p>
            <Routes>
              <Route path="/products" element={<Products />} />
            </Routes>
            <div className="product-list">
              {loading ? (
                <h1>Loading...</h1>
              ) : (
                <ul>
                  {menus.length > 0 ? (
                    menus.map(menu => (
                      <li key={menu.id}>
                        <h2>{menu.menuName}</h2>
                        <p>Meals:</p>
                        <ul>
                          {menu.meals.map((meal, mealIndex) => (
                            <li key={mealIndex}>
                              <strong>{meal.plat}</strong>: {meal.ingredients.join(', ')}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  ) : (
                    <p>No menus found.</p>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Right section (Red background with image) */}
          <div className="right-section">
            {/* Additional content can be added here */}
          </div>
        </div>

        {/* Add the new image between white and red sections */}
        <div className="middle-image">
          <img src={GroceriesImage} alt="Courses" />
        </div>
      </div>
    </Router>
  );
}

export default App;
