import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import db from './firebaseConfig'; // Firestore config
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import './App.css'; // Custom CSS

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Reference 'products' collection
        const productsSnapshot = await getDocs(productsCollection); // Get documents
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
            <img src="./path-to-your-image.png" alt="Food platter" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
