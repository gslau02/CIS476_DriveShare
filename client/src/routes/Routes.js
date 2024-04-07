// Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from '../pages/RegisterPage';
import AuthPage from '../pages/AuthPage';
import ListCarPage from '../pages/ListCarPage';
import MyListingsPage from '../pages/MyListingsPage';
import HomePage from '../pages/HomePage';
import EditCarPage from '../pages/EditCarPage';
import AllCarsPage from '../pages/AllCarsPage';
import SingleCarPage from '../pages/SingleCarPage';
import MyBookingsPage from '../pages/MyBookingsPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import PaymentPage from '../pages/PaymentPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/allCars" element={<AllCarsPage />} />
        <Route path="/car/:carId" element={<SingleCarPage />} />
        <Route path="/myBookings" element={<MyBookingsPage />} />
        <Route path="/myOrders" element={<MyOrdersPage />} />
        <Route path="/myListings" element={<MyListingsPage />} />
        <Route path="/listCar" element={<ListCarPage />} />
        <Route path="/editCar/:carId" element={<EditCarPage />} />
        <Route path="/payment" element={<PaymentPage />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
