import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import SideNavbar from './SideNavbarClient';
import { sideBar } from './UserMenu';
import "./UserProfileCard.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur :', error.message);
        }
      } else {
        console.error('Aucun utilisateur connecté.');
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData(user);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (event, field) => {
    setUserData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleBlur = async (field) => {
    setEditingField(null);
    if (!currentUser) return;

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { [field]: userData[field] });
      console.log(`${field} mis à jour dans Firestore`);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de ${field}:`, error.message);
    }
  };

  if (loading) {
    return <h1>Chargement...</h1>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {sideBar ? <SideNavbar /> : null }
      <div className='pl-6 flex flex-col'>
        <h1 className="text-2xl font-bold mb-4 text-[#2b1a46]">Informations Personnelles</h1>

        {/* ✅ Section 1: Basic Information */}
        <div className="bg-white shadow-md rounded-lg p-4 pr-10 mb-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="font-semibold text-[#2b1a46]">Nom</label>
              {editingField === 'displayName' ? (
                <input
                  type="text"
                  value={userData.displayName || ''}
                  onChange={(e) => handleChange(e, 'displayName')}
                  onBlur={() => handleBlur('displayName')}
                  className="profile-input"
                  autoFocus
                />
              ) : (
                <p className="profile-field" onClick={() => handleEdit('displayName')}>
                  {userData.displayName || 'Non spécifié'}
                </p>
              )}
            </div>

            {/* Email (Non-editable) */}
            <div>
              <label className="font-semibold text-[#2b1a46]">Adresse e-mail</label>
              <p className="profile-field bg-gray-200 cursor-not-allowed">
                {userData.email || 'Non spécifié'}
              </p>
            </div>

            {/* Adultes */}
            <div>
              <label className="font-semibold text-[#2b1a46]">Adultes</label>
              {editingField === 'adults' ? (
                <input
                  type="number"
                  min="1"
                  value={userData.adults || 0}
                  onChange={(e) => handleChange(e, 'adults')}
                  onBlur={() => handleBlur('adults')}
                  className="profile-input"
                  autoFocus
                />
              ) : (
                <p className="profile-field" onClick={() => handleEdit('adults')}>
                  {userData.adults || 0}
                </p>
              )}
            </div>

            {/* Enfants */}
            <div>
              <label className="font-semibold text-[#2b1a46]">Enfants</label>
              {editingField === 'children' ? (
                <input
                  type="number"
                  min="0"
                  value={userData.children || 0}
                  onChange={(e) => handleChange(e, 'children')}
                  onBlur={() => handleBlur('children')}
                  className="profile-input"
                  autoFocus
                />
              ) : (
                <p className="profile-field" onClick={() => handleEdit('children')}>
                  {userData.children || 0}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Section 2: Specific Information */}
        <h1 className="text-2xl font-bold mb-4 text-[#2b1a46]">Informations Spécifiques</h1>
        <div className="bg-white shadow-md rounded-lg p-4 pr-10">
          
          {/* Régimes */}
          <div>
            <label className="font-semibold text-[#2b1a46]">Régimes</label>
            {editingField === 'diets' ? (
              <input
                type="text"
                value={userData.diets?.join(', ') || ''}
                onChange={(e) => handleChange(e, 'diets')}
                onBlur={() => handleBlur('diets')}
                className="profile-input"
                autoFocus
              />
            ) : (
              <p className="profile-field" onClick={() => handleEdit('diets')}>
                {userData.diets?.join(', ') || 'Non spécifié'}
              </p>
            )}
          </div>

          {/* Ingrédients non appréciés */}
          <div>
            <label className="font-semibold text-[#2b1a46]">Ingrédients non appréciés</label>
            {editingField === 'dislikedIngredients' ? (
              <input
                type="text"
                value={userData.dislikedIngredients?.join(', ') || ''}
                onChange={(e) => handleChange(e, 'dislikedIngredients')}
                onBlur={() => handleBlur('dislikedIngredients')}
                className="profile-input"
                autoFocus
              />
            ) : (
              <p className="profile-field" onClick={() => handleEdit('dislikedIngredients')}>
                {userData.dislikedIngredients?.join(', ') || 'Non spécifié'}
              </p>
            )}
          </div>

          {/* Équipements de cuisine */}
          <div>
            <label className="font-semibold text-[#2b1a46]">Équipements de cuisine</label>
            {editingField === 'kitchenEquipment' ? (
              <input
                type="text"
                value={userData.kitchenEquipment?.join(', ') || ''}
                onChange={(e) => handleChange(e, 'kitchenEquipment')}
                onBlur={() => handleBlur('kitchenEquipment')}
                className="profile-input"
                autoFocus
              />
            ) : (
              <p className="profile-field" onClick={() => handleEdit('kitchenEquipment')}>
                {userData.kitchenEquipment?.join(', ') || 'Non spécifié'}
              </p>
            )}
          </div>

          {/* Objectifs */}
          <div>
            <label className="font-semibold text-[#2b1a46]">Objectifs</label>
            {editingField === 'goals' ? (
              <input
                type="text"
                value={userData.goals?.join(', ') || ''}
                onChange={(e) => handleChange(e, 'goals')}
                onBlur={() => handleBlur('goals')}
                className="profile-input"
                autoFocus
              />
            ) : (
              <p className="profile-field" onClick={() => handleEdit('goals')}>
                {userData.goals?.join(', ') || 'Non spécifié'}
              </p>
            )}
          </div>

        </div>
        {/* ✅ Section 3: Informations sur l'Abonnement */}
<h1 className="text-2xl font-bold mb-4 text-[#2b1a46]">Informations sur l'Abonnement</h1>
<div className="bg-white shadow-md rounded-lg p-4 pr-10 mb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
    {/* Type de box */}
    <div>
      <label className="font-semibold text-[#2b1a46]">Type de box</label>
      {editingField === 'boxType' ? (
        <input
          type="text"
          value={userData.boxType || ''}
          onChange={(e) => handleChange(e, 'boxType')}
          onBlur={() => handleBlur('boxType')}
          className="profile-input"
          autoFocus
        />
      ) : (
        <p className="profile-field" onClick={() => handleEdit('boxType')}>
          {userData.boxType || 'Standard'}
        </p>
      )}
    </div>

    {/* Statut de l'abonnement */}
    <div>
      <label className="font-semibold text-[#2b1a46]">Statut de l'abonnement</label>
      {editingField === 'subscriptionStatus' ? (
        <input
          type="text"
          value={userData.subscriptionStatus || ''}
          onChange={(e) => handleChange(e, 'subscriptionStatus')}
          onBlur={() => handleBlur('subscriptionStatus')}
          className="profile-input"
          autoFocus
        />
      ) : (
        <p className="profile-field" onClick={() => handleEdit('subscriptionStatus')}>
          {userData.subscriptionStatus || 'Actif'}
        </p>
      )}
    </div>

    {/* Date de début */}
    <div>
      <label className="font-semibold text-[#2b1a46]">Date de début</label>
      {editingField === 'startDate' ? (
        <input
          type="date"
          value={userData.startDate || ''}
          onChange={(e) => handleChange(e, 'startDate')}
          onBlur={() => handleBlur('startDate')}
          className="profile-input"
          autoFocus
        />
      ) : (
        <p className="profile-field" onClick={() => handleEdit('startDate')}>
          {userData.startDate || '01/01/2023'}
        </p>
      )}
    </div>

    {/* Date de fin */}
    <div>
      <label className="font-semibold text-[#2b1a46]">Date de fin</label>
      {editingField === 'endDate' ? (
        <input
          type="date"
          value={userData.endDate || ''}
          onChange={(e) => handleChange(e, 'endDate')}
          onBlur={() => handleBlur('endDate')}
          className="profile-input"
          autoFocus
        />
      ) : (
        <p className="profile-field" onClick={() => handleEdit('endDate')}>
          {userData.endDate || '01/01/2024'}
        </p>
      )}
    </div>
  </div>

  {/* Historique des livraisons */}
  <div className="mt-4">
    <label className="font-semibold text-[#2b1a46]">Historique de livraisons</label>
    <ul className="list-disc pl-5 text-gray-700">
      {userData.deliveryHistory?.length ? (
        userData.deliveryHistory.map((delivery, index) => (
          <li key={index}>{delivery}</li>
        ))
      ) : (
        <li>Aucune livraison enregistrée</li>
      )}
    </ul>
  </div>
</div>

{/* ✅ Section 4: Informations de Paiement */}
<h1 className="text-2xl font-bold mb-4 text-[#2b1a46]">Informations de Paiement</h1>
<div className="bg-white shadow-md rounded-lg p-4 pr-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Méthode de paiement */}
    <div>
      <label className="font-semibold text-[#2b1a46]">Méthode de paiement</label>
      {editingField === 'paymentMethod' ? (
        <input
          type="text"
          value={userData.paymentMethod || ''}
          onChange={(e) => handleChange(e, 'paymentMethod')}
          onBlur={() => handleBlur('paymentMethod')}
          className="profile-input"
          autoFocus
        />
      ) : (
        <p className="profile-field" onClick={() => handleEdit('paymentMethod')}>
          {userData.paymentMethod || 'Carte bancaire'}
        </p>
      )}
    </div>
  </div>

  {/* Historique des paiements */}
  <div className="mt-4">
    <label className="font-semibold text-[#2b1a46]">Historique des paiements</label>
    <ul className="list-disc pl-5 text-gray-700">
      {userData.paymentHistory?.length ? (
        userData.paymentHistory.map((payment, index) => (
          <li key={index}>{payment}</li>
        ))
      ) : (
        <li>Aucun paiement enregistré</li>
      )}
    </ul>
  </div>

  {/* Factures */}
  <div className="mt-4">
    <label className="font-semibold text-[#2b1a46]">Factures</label>
    <ul className="list-disc pl-5 text-red-500">
      {userData.invoices?.length ? (
        userData.invoices.map((invoice, index) => (
          <li key={index}>{invoice}</li>
        ))
      ) : (
        <li>Aucune facture disponible</li>
      )}
    </ul>
  </div>
</div>

      </div>
    </div>
  );
};

export default UserProfile;
