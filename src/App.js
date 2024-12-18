import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard'; // Import MenuCard component
import SearchBox from './components/SearchBox';
import Carousel from './components/Carousel'
import db from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Products from './Products';
import Subscriptions from './Subscriptions';
import Registration from './Registration';
//import GroceriesImage from './assets/images/groceries.png';
import Footer from './components/Footer';
import BoxSection from './components/BoxSection';
import HowItWorksSection from './components/HowItWorksSection';
import ReviewsSection from './components/ReviewsSection';
import './App.css';
import ErrorPage from './Error'; // Import Error component
import AboutPage from './About'; // Import About component
import ContactPage from './Contact';
import PartnersSection from './components/PartnersSection';
import ManagePartners from './ManagePartners';
import ProfilePage from './Profile';
import VendorOrCustomer from './VendorOrCustomer';
import VendorRegistrationPage from './VendorRegistrationPage';


function App() {
  const [cityQuery, setCityQuery] = useState('');
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPartners, setShowPartners] = useState(false); // État pour PartnersSection
  const partnersRef = useRef(null);

  const handleSearch = (searchQuery) => {
    // Vous pouvez ajouter ici toute logique de recherche supplémentaire si nécessaire

    // Afficher la section des partenaires
    setCityQuery(searchQuery);
    setShowPartners(true);
    // Faire défiler vers la section des partenaires
    if (partnersRef.current) {
      partnersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/vendre" element={<Registration/>} />
        <Route path="/partenaires" element={<ManagePartners/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/selectRole" element={<VendorOrCustomer/>}/>
        <Route path='/vendorRegistration' element={<VendorRegistrationPage/>}/>
        <Route
          path="/"
          element={
            <>
              <div className="content-container">
                <div className="main-section">
                  <p>Nous livrons tous les jours les quartiers de nombreuses villes en France.</p>
                  <h1>Découvrez si nous livrons chez vous</h1>
                  <SearchBox onSearch={handleSearch} />
                  <Carousel />
                  <div className='text-customRed'>
                    <p> Les Menus Populaires cette semaine : </p>
                  </div>
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
              {showPartners && (
                <div ref={partnersRef}>
                  <PartnersSection cityQuery={cityQuery}/>
                </div>
              )}
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
