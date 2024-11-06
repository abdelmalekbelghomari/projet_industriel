import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import db from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions
import Products from './Products';
// import Home from './pages/Home'; // Assuming this is your main homepage component
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
          meals: doc.data().meals || [],
        }));
    
        console.log('Fetched menus:', menusList);
        setMenus(menusList);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenus();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="pt-24"> </div>
      <Routes>
        {/* Route for Products */}
        <Route path="/products" element={<Products />} />
        {/* Route for Home */}
        <Route
          path="/"
          element={
            <div className="content-container">
              <div className="left-section">
                <h1>Découvrez si nous livrons chez vous</h1>
                <div className="search-box">
                  <input type="text" placeholder="Faites votre recherche ici..." />
                  <button>GO</button>
                </div>
                <p>Nous livrons tous les jours les quartiers de nombreuses villes en France.</p>
                <div className="product-list">
                  {loading ? (
                    <h1>Loading...</h1>
                  ) : (
                    <ul>
                      {menus.length > 0 ? (
                        menus.map((menu) => (
                          <li key={menu.id}>
                            <h2>{menu.menuName}</h2>
                            <p>Meals:</p>
                            <ul>
                              {menu.meals.map((meal, mealIndex) => (
                                <li key={mealIndex}>
                                  <strong>{meal.name}</strong>: {meal.ingredients.join(', ')}
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
              <div className="right-section">
                <div className="middle-image">
                  <img src={GroceriesImage} alt="Courses" />
                </div>
              </div>
            </div>
          }
        />

        
      </Routes>
    </Router>
  );
}

export default App;
