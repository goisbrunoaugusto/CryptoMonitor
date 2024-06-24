// src/pages/Favorite.jsx

import React, { useState } from 'react';
import NavigationBar from '@/components/ui/navigation-bar';
import FavoriteTable from '@/components/ui/favorite-table';
import { useAuth } from '../utils/auth';
import NotLoggedInPopup from '@/components/ui/NotLoggedInPopup';

const Favorite = () => {
  const isAuthenticated = useAuth();
  const [showPopup, setShowPopup] = useState(!isAuthenticated); // Mostrar o popup se não estiver autenticado

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <NavigationBar />
      <FavoriteTable />
      {!isAuthenticated && showPopup && <NotLoggedInPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Favorite;
