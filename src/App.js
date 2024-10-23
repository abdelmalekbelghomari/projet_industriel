import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import db from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import necessary Firestore functions
import Products from './Products';
import GroceriesImage from './assets/images/groceries.png';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Router>
    <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/products" element={<Products />} />
            </Routes>
            <div className="content-container">
              {/* Left section (White background) */}
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
                      {products.map(product => (
                        <li key={product.id}>
                          <h2>{product.name}</h2>
                          <p>Price: {product.price} €</p>
                          <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
                          <p>Qui est le gros puant: {product.quiPue ? product.quiPue : "Personne"}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Right section (Red background with image) */}
              <div className="right-section">
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
