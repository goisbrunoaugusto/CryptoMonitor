import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Home from './pages/Home'; // Assuming you have a Home page for authenticated users
import PrivateRoute from './components/PrivateRoute'; // Your PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <PrivateRoute path="/home" element={<Home />} />
        <PrivateRoute path="/favorites" element={<Favorites />} />

        {/* Redirect to login if no matching route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
