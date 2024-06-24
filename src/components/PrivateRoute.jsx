// src/components/PrivateRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth'; // Importe a função useAuth

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
