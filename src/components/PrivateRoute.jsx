// src/components/PrivateRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Função ou hook para verificar autenticação
const useAuth = () => {
  const userId = Cookies.get('userId'); // Exemplo usando js-cookie
  return !!userId; // Retorna true se userId existir, false caso contrário
};

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
