import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import db from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import necessary Firestore functions

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Reference the 'products' collection
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
      <Navbar />
      <h1 className="text-3xl font-bold underline">Welcome to EcolocoBox!</h1>
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h2>{product.name}</h2>
                <p>Price: {product.price}</p>
                <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Router>
  );
}

export default App;
