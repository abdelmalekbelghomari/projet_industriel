import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard'; // Import MenuCard component
import SearchBox from './components/SearchBox';
import db from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Products from './Products';
import Subscriptions from './Subscriptions';
import Registration from './Registration';
import Footer from './components/Footer';
import BoxSection from './components/BoxSection';
import HowItWorksSection from './components/HowItWorksSection';
import ReviewsSection from './components/ReviewsSection';
import './App.css';
import ErrorPage from './Error';
import AboutPage from './About';  
import ContactPage from './Contact';
import PartnersSection from './components/PartnersSection';
import ManagePartners from './ManagePartners';
import UserSubscriptionPage from './UserSubscription';
import ProfilePage from './Profile';
import VendorOrCustomer from './VendorOrCustomer';
import VendorRegistrationPage from './VendorRegistrationPage';
import Dashboard from './Dashboard';
import GoogleAuthPage from './GoogleVendorOrCustomer';
import UserProfile from './components/UserProfileCard';
import Menus from './Menus';
import WorkerPage from './WorkerPage';

function App() {
  const [cityQuery, setCityQuery] = useState('');
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPartners, setShowPartners] = useState(false);
  const partnersRef = useRef(null);


  const handleSearch = (searchQuery) => {
    setCityQuery(searchQuery);
    setShowPartners(true);
    if (partnersRef.current) {
      partnersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
        {/* Navbar */}
        <Navbar />

        {/* Contenu principal */}
        <div className="flex-grow">
          <Routes>
            <Route path="/worker/*" element={<WorkerPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/vendre" element={<Registration />} />
            <Route path="/partenaires" element={<ManagePartners />} />
            <Route path="/userRegistration" element={<UserSubscriptionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/selectRole" element={<VendorOrCustomer />} />
            <Route path='/vendorRegistration' element={<VendorRegistrationPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/googleAuth' element={<GoogleAuthPage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/workerPage" element={<WorkerPage/>} />
            <Route
              path="/"
              element={
                <>
                    <div className="flex flex-col ml-8 mt-8">
                      <div className='text-4xl text-customBlue'>Découvrez si nous livrons chez vous</div>
                      <SearchBox onSearch={handleSearch} />
                      <div className='text-2xl text-customBlue'>Nous livrons tous les jours les quartiers de nombreuses villes en France.</div>
                    </div>
                  {showPartners && (
                    <div ref={partnersRef}>
                      <PartnersSection cityQuery={cityQuery} />
                    </div>
                  )}
                  <HowItWorksSection />
                  <BoxSection />
                  <Menus />          
                  <ReviewsSection />
                </>
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
    </Router>
  );
}

export default App;
