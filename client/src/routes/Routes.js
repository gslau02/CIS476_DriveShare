// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from '../pages/RegisterPage';
import AuthPage from '../pages/AuthPage';
import ListCarPage from '../pages/ListCarPage';
import MyListingsPage from '../pages/MyListingsPage';
import HomePage from '../pages/HomePage';
import EditCarPage from '../pages/EditCarPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/myListings" element={<MyListingsPage />} />
        <Route path="/listCar" element={<ListCarPage />} />
        <Route path="/editCar/:carId" element={<EditCarPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
