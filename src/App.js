import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard'; // Import MenuCard component
import SearchBox from './components/SearchBox';
import db from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Products from './Products';
import Subscriptions from './Subscriptions';
import GroceriesImage from './assets/images/groceries.png';
import Footer from './components/Footer';
import BoxSection from './components/BoxSection';
import HowItWorksSection from './components/HowItWorksSection';
import ReviewsSection from './components/ReviewsSection';
import './App.css';
import ErrorPage from './Error'; // Import Error component

function App() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic here
  };

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
      <div className="pt-24"></div>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/about" element={<ErrorPage />} />
        <Route path="/contact" element={<ErrorPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route
          path="/"
          element={
            <>
              <div className="content-container">
                <div className="main-section">
                  <h1>Découvrez si nous livrons chez vous</h1>
                  <SearchBox onSearch={handleSearch} />
                  <p>Nous livrons tous les jours les quartiers de nombreuses villes en France.</p>
                  <div className="flex flex-wrap justify-center mt-8">
                    {loading ? (
                      <h1>Loading...</h1>
                    ) : (
                      menus.length > 0 ? (
                        menus.map((menu) => (
                          <MenuCard key={menu.id} menu={menu} />
                        ))
                      ) : (
                        <p>No menus found.</p>
                      )
                    )}
                  </div>
                  {/* <div className="middle-image mt-8">
                    <img src={GroceriesImage} alt="Courses" />
                  </div> */}
                </div>
              </div>
              <BoxSection />
              <HowItWorksSection />
              <ReviewsSection />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
