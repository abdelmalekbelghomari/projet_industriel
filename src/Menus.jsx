import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebaseConfig';
import MenuCard from './components/MenuCard';

function Menus(){
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex flex-wrap justify-center mt-8">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        menus.length > 0 ? (
          menus.map((menu) => <MenuCard key={menu.id} menu={menu} />)
        ) : (
          <p>No menus found.</p>
        )
      )}
    </div>
  );
};

export default Menus;
